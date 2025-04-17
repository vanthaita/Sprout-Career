'use client';
import axiosInstance from '@/axios/axiosIntance';
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Loader2 } from 'lucide-react';
import { format, parseISO, isValid, formatISO } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Toaster, toast } from "sonner";

import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import ProfileSectionCard from '@/components/profile/ProfileSectionCard';
import ProfileItemModal from '@/components/profile/ProfileItemModal';
import { formatDateRange, formatDateSingle } from '@/components/profile/helpers'; 

const GenderType = { MALE: 'MALE', FEMALE: 'FEMALE', OTHER: 'OTHER', NOT_SPECIFIED: 'NOT_SPECIFIED' };
const JapaneseProficiencyLevel = { N1: 'N1', N2: 'N2', N3: 'N3', N4: 'N4', N5: 'N5', NONE: 'NONE' };
const ProficiencyLevel = { NATIVE: 'NATIVE', BUSINESS: 'BUSINESS', CONVERSATIONAL: 'CONVERSATIONAL', BASIC: 'BASIC', NONE: 'NONE' };

const profileSchema = z.object({
    fullNameKanji: z.string().max(100).optional().nullable(),
    fullNameKana: z.string().max(100).optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.nativeEnum(GenderType).optional().nullable(),
    currentAddressJp: z.string().optional().nullable(),
    phoneNumber: z.string().max(20).optional().nullable(),
    email: z.string().email().max(255).optional(),
    profilePhotoUrl: z.string().url().max(255).optional().nullable(),
    motivation: z.string().optional().nullable(),
    selfPromotion: z.string().optional().nullable(),
    hobbies: z.string().optional().nullable(),
    candidateRequests: z.string().optional().nullable(),
    japaneseProficiency: z.nativeEnum(JapaneseProficiencyLevel).optional().nullable(),
    otherLanguages: z.array(
        z.object({
            language: z.string().min(1, "Language is required"),
            proficiency: z.nativeEnum(ProficiencyLevel).refine(val => val !== 'NONE', { message: "Proficiency level is required" })
        })
    ).optional().nullable()
});

const dateOrNull = z.preprocess((arg) => {
  if (!arg || typeof arg !== 'string') return null;
  const date = parseISO(arg);
  return isValid(date) ? date : null;
}, z.date().nullable());

const educationSchema = z.object({
    schoolName: z.string().min(1, "School name is required").max(255),
    degreeOrStatus: z.string().max(100).optional().nullable(),
    startDate: dateOrNull,
    endDate: dateOrNull,
    location: z.string().max(255).optional().nullable(),
    description: z.string().optional().nullable(),
}).refine(data => !data.startDate || !data.endDate || data.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date",
    path: ["endDate"],
});

const workExperienceSchema = z.object({
    companyName: z.string().min(1, "Company name is required").max(255),
    position: z.string().min(1, "Position is required").max(100),
    startDate: dateOrNull,
    endDate: dateOrNull,
    location: z.string().max(255).optional().nullable(),
    description: z.string().optional().nullable(),
}).refine(data => !data.startDate || !data.endDate || data.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date",
    path: ["endDate"],
});

const qualificationSchema = z.object({
    name: z.string().min(1, "Qualification name is required").max(255),
    issuingOrganization: z.string().max(255).optional().nullable(),
    issueDate: dateOrNull,
    expirationDate: dateOrNull,
    credentialId: z.string().max(100).optional().nullable(),
    credentialUrl: z.string().url().max(255).optional().nullable(),
}).refine(data => !data.issueDate || !data.expirationDate || data.expirationDate >= data.issueDate, {
    message: "Expiration date cannot be earlier than issue date",
    path: ["expirationDate"],
});

const cvSchema = z.object({
    fileName: z.string().min(1, "File name is required").max(255),
    fileUrl: z.string().min(1, "File URL is required").url("Invalid URL format").max(255),
    fileType: z.string().max(50).optional().nullable(),
    notes: z.string().optional().nullable(),
    isPrimary: z.boolean().optional().default(false),
});

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [educationData, setEducationData] = useState([]);
    const [workExperienceData, setWorkExperienceData] = useState([]);
    const [qualificationData, setQualificationData] = useState([]);
    const [cvData, setCvData] = useState([]);
    const [serverError, setServerError] = useState(null);
    const [modalState, setModalState] = useState({ open: false, type: null, mode: 'add', data: null, error: null });

    const profileForm = useForm({ resolver: zodResolver(profileSchema), defaultValues: {} });
    const educationForm = useForm({ resolver: zodResolver(educationSchema) });
    const workExperienceForm = useForm({ resolver: zodResolver(workExperienceSchema) });
    const qualificationForm = useForm({ resolver: zodResolver(qualificationSchema) });
    const cvForm = useForm({ resolver: zodResolver(cvSchema) });

    const { fields: otherLangFields, append: appendLang, remove: removeLang } = useFieldArray({
        control: profileForm.control, name: "otherLanguages"
    });

    const fetchProfileData = useCallback(async (showToast = false) => {
        setIsLoading(true); setServerError(null);
        try {
            const response = await axiosInstance.get('/candidate/profile');
            let formattedProfile = {
                fullNameKanji: '', fullNameKana: '', dateOfBirth: null, gender: null,
                currentAddressJp: '', phoneNumber: '', email: '', profilePhotoUrl: null,
                motivation: '', selfPromotion: '', hobbies: '', candidateRequests: '',
                japaneseProficiency: null, otherLanguages: []
            };
            let fetchedEducation = [];
            let fetchedWorkExp = [];
            let fetchedQuals = [];
            let fetchedCvs = [];

            if (response.data?.data) {
                const fetchedData = response.data.data;
                formattedProfile = {
                    ...formattedProfile, ...fetchedData,
                    dateOfBirth: fetchedData.dateOfBirth ? format(parseISO(fetchedData.dateOfBirth), 'yyyy-MM-dd') : null,
                    otherLanguages: fetchedData.otherLanguages?.map(lang => ({...lang, proficiency: lang.proficiency ?? 'NONE'})) || [],
                    lastUpdatedAt: fetchedData.lastUpdatedAt
                };
                fetchedEducation = fetchedData.education || [];
                fetchedWorkExp = fetchedData.workExperience || [];
                fetchedQuals = fetchedData.qualifications || [];
                fetchedCvs = fetchedData.cvs || [];
                if (showToast) toast.success("Profile data loaded.");
            } else {
                toast.info("No profile data found. You can start by creating your profile.");
            }

            setProfileData(formattedProfile);
            setEducationData(fetchedEducation);
            setWorkExperienceData(fetchedWorkExp);
            setQualificationData(fetchedQuals);
            setCvData(fetchedCvs);
            profileForm.reset(formattedProfile);

        } catch (error) {
            console.error("Fetch error:", error);
            setServerError('Failed to load profile data');
            toast.error("Failed to load profile data");
            setProfileData({}); setEducationData([]); setWorkExperienceData([]);
            setQualificationData([]); setCvData([]); profileForm.reset({});
        } finally {
            setIsLoading(false);
        }
    }, [profileForm]);

    useEffect(() => { fetchProfileData(); }, [fetchProfileData]);

    const openModal = (type, mode = 'add', data = null) => {
        let form;
        let defaultValues = {};
        switch(type) {
            case 'education': form = educationForm; defaultValues = data || {}; break;
            case 'workExperience': form = workExperienceForm; defaultValues = data || {}; break;
            case 'qualification': form = qualificationForm; defaultValues = data || {}; break;
            case 'cv': form = cvForm; defaultValues = data || { isPrimary: false }; break;
            default: return;
        }
        Object.keys(defaultValues).forEach(key => {
          if ((key.endsWith('Date') || key === 'dateOfBirth') && defaultValues[key]) {
            if (typeof defaultValues[key] === 'string') {
              const parsed = parseISO(defaultValues[key]);
              defaultValues[key] = isValid(parsed) ? parsed : null;
            } else if (!(defaultValues[key] instanceof Date)) {
                 defaultValues[key] = null;
            }
          } else if (!defaultValues[key] && (key.endsWith('Date') || key === 'dateOfBirth')) {
               defaultValues[key] = null;
          }
        });

        form.reset(defaultValues);
        setModalState({ open: true, type, mode, data, error: null });
    };

    const closeModal = () => {
        setModalState({ open: false, type: null, mode: 'add', data: null, error: null });
        educationForm.reset(); workExperienceForm.reset(); qualificationForm.reset(); cvForm.reset();
    };

    const handleApiCall = async (method, url, payload, section, successMessage) => {
        setIsSubmitting(true);
        setModalState(prev => ({ ...prev, error: null }));

        const apiPayload = { ...payload };
        Object.keys(apiPayload).forEach(key => {
            if (apiPayload[key] instanceof Date) {
                 apiPayload[key] = formatISO(apiPayload[key]);
            }
        });

        try {
            let response;
            if (method === 'post') response = await axiosInstance.post(url, apiPayload);
            else if (method === 'patch') response = await axiosInstance.patch(url, apiPayload);
            else if (method === 'delete') response = await axiosInstance.delete(url);
            else throw new Error("Invalid HTTP method");

            const newItem = response.data?.data;
            const itemId = modalState.data?.id; 

            switch(section) {
                 case 'education':
                    if (method === 'delete') setEducationData(prev => prev.filter(item => item.id !== itemId));
                    else if (modalState.mode === 'edit') setEducationData(prev => prev.map(item => item.id === itemId ? newItem : item));
                    else setEducationData(prev => [...prev, newItem]);
                    break;
                case 'workExperience':
                    if (method === 'delete') setWorkExperienceData(prev => prev.filter(item => item.id !== itemId));
                    else if (modalState.mode === 'edit') setWorkExperienceData(prev => prev.map(item => item.id === itemId ? newItem : item));
                    else setWorkExperienceData(prev => [...prev, newItem]);
                    break;
                case 'qualification':
                     if (method === 'delete') setQualificationData(prev => prev.filter(item => item.id !== itemId));
                    else if (modalState.mode === 'edit') setQualificationData(prev => prev.map(item => item.id === itemId ? newItem : item));
                    else setQualificationData(prev => [...prev, newItem]);
                    break;
                 case 'cv':
                     if (method === 'delete') setCvData(prev => prev.filter(item => item.id !== itemId));
                    else if (modalState.mode === 'edit') setCvData(prev => prev.map(item => item.id === itemId ? newItem : item));
                    else setCvData(prev => [...prev, newItem]);
                    break;
            }
            toast.success(successMessage);
            closeModal();
        } catch (error) {
            console.error(`${section} ${method} error:`, error);
            const errorMessage = error.response?.data?.message || error.message || `Failed to ${method} ${section}`;
            setModalState(prev => ({ ...prev, error: errorMessage }));
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onProfileSubmit = async (data) => {
        setIsSubmitting(true); setServerError(null);
        try {
            const payload = {
                ...data,
                dateOfBirth: data.dateOfBirth && isValid(new Date(data.dateOfBirth))
                    ? format(new Date(data.dateOfBirth), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
                 otherLanguages: data.otherLanguages?.filter(lang => lang.language && lang.proficiency && lang.proficiency !== 'NONE') || null
            };
            const response = await axiosInstance.patch('/candidate/profile', payload);
             toast.success("Profile updated successfully!");
            const updatedRawData = response.data.data;
            const updatedFormattedData = {
                ...profileData, ...updatedRawData,
                dateOfBirth: updatedRawData.dateOfBirth ? format(parseISO(updatedRawData.dateOfBirth), 'yyyy-MM-dd') : null,
                otherLanguages: updatedRawData.otherLanguages?.map(lang => ({...lang, proficiency: lang.proficiency ?? 'NONE'})) || [],
                lastUpdatedAt: updatedRawData.lastUpdatedAt
            };
            setProfileData(updatedFormattedData);
            profileForm.reset(updatedFormattedData);
        } catch (error) {
            console.error("Update error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to update profile";
            setServerError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onEducationSubmit = (data) => handleApiCall(modalState.mode === 'add' ? 'post' : 'patch', modalState.mode === 'add' ? '/candidate/education' : `/candidate/education/${modalState.data.id}`, data, 'education', `Education ${modalState.mode === 'add' ? 'added' : 'updated'}`);
    const deleteEducation = (id) => handleApiCall('delete', `/candidate/education/${id}`, null, 'education', 'Education deleted');

    const onWorkExperienceSubmit = (data) => handleApiCall(modalState.mode === 'add' ? 'post' : 'patch', modalState.mode === 'add' ? '/candidate/work-experience' : `/candidate/work-experience/${modalState.data.id}`, data, 'workExperience', `Work Experience ${modalState.mode === 'add' ? 'added' : 'updated'}`);
    const deleteWorkExperience = (id) => handleApiCall('delete', `/candidate/work-experience/${id}`, null, 'workExperience', 'Work Experience deleted');

    const onQualificationSubmit = (data) => handleApiCall(modalState.mode === 'add' ? 'post' : 'patch', modalState.mode === 'add' ? '/candidate/qualification' : `/candidate/qualification/${modalState.data.id}`, data, 'qualification', `Qualification ${modalState.mode === 'add' ? 'added' : 'updated'}`);
    const deleteQualification = (id) => handleApiCall('delete', `/candidate/qualification/${id}`, null, 'qualification', 'Qualification deleted');

    const onCvSubmit = (data) => handleApiCall(modalState.mode === 'add' ? 'post' : 'patch', modalState.mode === 'add' ? '/candidate/cv' : `/candidate/cv/${modalState.data.id}`, data, 'cv', `CV ${modalState.mode === 'add' ? 'added' : 'updated'}`);
    const deleteCv = (id) => handleApiCall('delete', `/candidate/cv/${id}`, null, 'cv', 'CV deleted');

    if (isLoading) { return <div className="flex justify-center items-center h-screen"><Loader2 className="mr-2 h-8 w-8 animate-spin" />Loading...</div>; }

    const renderEducationItem = (edu) => (
        <>
            <p className="font-semibold">{edu.schoolName}</p>
            <p className="text-sm text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate)} {edu.location ? `| ${edu.location}` : ''}</p>
            {edu.description && <p className="text-sm mt-1 whitespace-pre-wrap">{edu.description}</p>}
        </>
    );

    const renderWorkExperienceItem = (exp) => (
         <>
            <p className="font-semibold">{exp.companyName}</p>
            <p className="text-sm text-muted-foreground">{exp.position}</p>
            <p className="text-sm text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate)} {exp.location ? `| ${exp.location}` : ''}</p>
             {exp.description && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.description}</p>}
        </>
    );

     const renderQualificationItem = (qual) => (
        <>
            <p className="font-semibold">{qual.name}</p>
             {qual.issuingOrganization && <p className="text-sm text-muted-foreground">発行元: {qual.issuingOrganization}</p>}
            <p className="text-sm text-muted-foreground">
                取得日: {formatDateSingle(qual.issueDate)}
                {qual.expirationDate ? ` | 有効期限: ${formatDateSingle(qual.expirationDate)}` : ''}
            </p>
            {qual.credentialId && <p className="text-sm text-muted-foreground">ID: {qual.credentialId}</p>}
            {qual.credentialUrl && <a href={qual.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">証明書リンク</a>}
        </>
    );

    const renderCvItem = (cv) => (
        <>
            <a href={cv.fileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{cv.fileName}</a>
            {cv.isPrimary && <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Primary</span>}
            {cv.fileType && <p className="text-sm text-muted-foreground">タイプ: {cv.fileType}</p>}
            {cv.notes && <p className="text-sm mt-1 whitespace-pre-wrap">{cv.notes}</p>}
        </>
    );

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            <Toaster position="top-right" richColors />

            <ProfileInfoCard
                profileForm={profileForm}
                onProfileSubmit={onProfileSubmit}
                isSubmitting={isSubmitting}
                serverError={serverError}
                profileData={profileData}
                otherLangFields={otherLangFields}
                appendLang={appendLang}
                removeLang={removeLang}
                GenderType={GenderType}
                JapaneseProficiencyLevel={JapaneseProficiencyLevel}
                ProficiencyLevel={ProficiencyLevel}
            />

            <ProfileSectionCard
                title="学歴 (Education)"
                data={educationData}
                onAddClick={() => openModal('education', 'add')}
                onEditClick={(item) => openModal('education', 'edit', item)}
                onDeleteConfirm={deleteEducation}
                renderItem={renderEducationItem}
                emptyText="No education history added yet."
            />

            <ProfileSectionCard
                title="職歴 (Work Experience)"
                data={workExperienceData}
                onAddClick={() => openModal('workExperience', 'add')}
                onEditClick={(item) => openModal('workExperience', 'edit', item)}
                onDeleteConfirm={deleteWorkExperience}
                renderItem={renderWorkExperienceItem}
                emptyText="No work experience added yet."
            />

            <ProfileSectionCard
                title="免許・資格 (Qualifications)"
                data={qualificationData}
                onAddClick={() => openModal('qualification', 'add')}
                onEditClick={(item) => openModal('qualification', 'edit', item)}
                onDeleteConfirm={deleteQualification}
                renderItem={renderQualificationItem}
                emptyText="No qualifications added yet."
            />

             <ProfileSectionCard
                title="CVs (履歴書・職務経歴書ファイル)"
                data={cvData}
                onAddClick={() => openModal('cv', 'add')}
                onEditClick={(item) => openModal('cv', 'edit', item)}
                onDeleteConfirm={deleteCv}
                renderItem={renderCvItem}
                emptyText="No CVs uploaded yet."
            />

            <ProfileItemModal
                modalState={modalState}
                isSubmitting={isSubmitting}
                onClose={closeModal}
                onSubmitHandlers={{
                    education: onEducationSubmit,
                    workExperience: onWorkExperienceSubmit,
                    qualification: onQualificationSubmit,
                    cv: onCvSubmit,
                }}
                forms={{
                    education: educationForm,
                    workExperience: workExperienceForm,
                    qualification: qualificationForm,
                    cv: cvForm,
                }}
                ProficiencyLevel={ProficiencyLevel} 
            />
        </div>
    );
};

export default ProfilePage;