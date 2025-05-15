"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Briefcase, Plus, Trash, User, Upload, Calendar, MapPin, Phone, GraduationCap, 
  BookOpen, Award, Code, PenTool, Linkedin, Github, Globe,
  Building2, Users, FileText, ClipboardList, BadgeCheck, 
  Loader2
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import axiosInstance from '@/axios/axiosIntance'
import { useRouter } from 'next/navigation'

const OnboardingPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState('candidate')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [candidateData, setCandidateData] = useState({
    fullName: '',
    gender: '',
    address: '',
    phoneNumber: '',
    profilePhoto: null,
    motivation: '',
    skills: '',
    education: [{ institution: '', degree: '', startYear: '', endYear: '' }],
    workExperience: [{ company: '', position: '', startDate: '', endDate: '' }],
    links: { linkedin: '', github: '', portfolio: '' }
  })

  const [employerData, setEmployerData] = useState({
    companyName: '',
    companyDescription: '',
    companyLogo: null,
    website: '',
    industry: '',
    companySize: '',
    foundedYear: ''
  })
  
  useEffect(() => {
    const checkIsOnboarded = async () => {
      try {
        setLoading(true)
        const { data: res } = await axiosInstance.get('/users/check-isOnboarded');
        const { isOnboarded, userType } = res.data;
        if (isOnboarded) {
          router.push(`/dashboard/${userType.toLowerCase()}`);
        }
      } catch (error) {
        console.error('Failed to check onboarding status', error);
      } finally {
        setLoading(false)
      }
    };
    
    checkIsOnboarded();
  }, [router]);

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    const dateOfBirthISO = new Date(dateOfBirth);
    
    if (isNaN(dateOfBirthISO.getTime())) { 
      console.error("Invalid date format:", dateOfBirth);
      setSubmitting(false)
      return;
    }
  
    try {
      const profileResponse = await axiosInstance.post('/candidate/profile', {
        fullName: candidateData.fullName,
        gender: candidateData.gender,
        address: candidateData.address,
        phoneNumber: candidateData.phoneNumber,
        profilePhotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s",
        motivation: candidateData.motivation,
        skills: candidateData.skills,
        dateOfBirth: dateOfBirthISO.toISOString()
      });
  
      if (candidateData.education.length > 0) {
        const educationData = candidateData.education.map(edu => ({
          schoolName: edu.institution,
          degree: edu.degree,
          startDate: edu.startYear,
          endDate: edu.endYear || null
        }));
        await axiosInstance.post('/candidate/education', {
          educations: educationData
        });
      }
  
      if (candidateData.workExperience.length > 0) {
        const workExperienceData = candidateData.workExperience.map(work => ({
          companyName: work.company,
          position: work.position,
          startDate: work.startDate,
          endDate: work.endDate || null
        }));
        await axiosInstance.post('/candidate/work-experience', {
          workExperiences: workExperienceData
        });
      }
  
      await axiosInstance.patch('/users/update-onboarding');
      router.push('/dashboard/candidate');
    } catch (error) {
      console.error('Error during profile submission:', error);
    } finally {
      setSubmitting(false)
    }
  };


  const handleEmployerSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      await axiosInstance.post('/employer', {
        companyName: employerData.companyName,
        companyLogoUrl:  '',
        companySize: employerData.companySize,
        industry: employerData.industry,
        foundedYear: employerData.foundedYear, 
        CompanyUrl: employerData.website,      
        CompanyDesc: employerData.companyDescription,
      });
      
      await axiosInstance.patch('/users/update-onboarding');
      router.push('/dashboard/employee');
    } catch(error) {
      console.error('Error during profile submission:', error);
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  const handleCandidateChange = (e) => {
    setCandidateData({
      ...candidateData,
      [e.target.name]: e.target.value
    })
  }

  const handleEmployerChange = (e) => {
    setEmployerData({
      ...employerData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (userType === 'candidate') {
      setCandidateData({ ...candidateData, profilePhoto: file })
    } else {
      setEmployerData({ ...employerData, companyLogo: file })
    }
  }

  const addEducationField = () => {
    setCandidateData({
      ...candidateData,
      education: [...candidateData.education, { institution: '', degree: '', startYear: '', endYear: '' }]
    })
  }

  const removeEducationField = (index) => {
    const newEducation = [...candidateData.education]
    newEducation.splice(index, 1)
    setCandidateData({
      ...candidateData,
      education: newEducation
    })
  }

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target
    const newEducation = [...candidateData.education]
    newEducation[index][name] = value
    setCandidateData({
      ...candidateData,
      education: newEducation
    })
  }

  const addWorkExperienceField = () => {
    setCandidateData({
      ...candidateData,
      workExperience: [...candidateData.workExperience, { company: '', position: '', startDate: '', endDate: '' }]
    })
  }

  const removeWorkExperienceField = (index) => {
    const newWorkExperience = [...candidateData.workExperience]
    newWorkExperience.splice(index, 1)
    setCandidateData({
      ...candidateData,
      workExperience: newWorkExperience
    })
  }

  const handleWorkExperienceChange = (e, index) => {
    const { name, value } = e.target
    const newWorkExperience = [...candidateData.workExperience]
    newWorkExperience[index][name] = value
    setCandidateData({
      ...candidateData,
      workExperience: newWorkExperience
    })
  }

  const handleLinkChange = (e) => {
    const { name, value } = e.target
    setCandidateData({
      ...candidateData,
      links: {
        ...candidateData.links,
        [name]: value
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 ">
        <div className="">
          <Tabs 
            defaultValue="candidate" 
            value={userType}
            onValueChange={setUserType}
            className="w-full bg-white"
          >
            <TabsList className="grid grid-cols-2 w-full rounded-none bg-white h-full">
              <TabsTrigger 
                value="candidate" 
                className="py-6 gap-2 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <User className="h-5 w-5" />
                Candidate
              </TabsTrigger>
              <TabsTrigger 
                value="employer" 
                className="py-6 gap-2 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <Briefcase className="h-5 w-5" />
                Employer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs 
        defaultValue="candidate" 
        value={userType}
        onValueChange={setUserType}
        className="flex-1 overflow-y-auto"
      >
        <div className="">
          <Card className="overflow-hidden shadow-none border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-gray-500 text-lg">
                {userType === 'candidate' 
                  ? "Tell us more about yourself to get better job matches" 
                  : "Provide company details to start posting jobs"}
              </CardDescription>
            </CardHeader>
            
            <Separator className="mb-6 mx-6" />
            
            <CardContent>
              <TabsContent value="candidate">
                <form onSubmit={handleCandidateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-medium text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={candidateData.fullName}
                      onChange={handleCandidateChange}
                      required
                      className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Gender *
                  </Label>
                  <RadioGroup
                    value={candidateData.gender}
                    onValueChange={(value) => setCandidateData({...candidateData, gender: value})}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="male" className="text-primary border-gray-300" />
                      <Label htmlFor="MALE" className="font-normal text-gray-600">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="female" className="text-primary border-gray-300" />
                      <Label htmlFor="FEMALE" className="font-normal text-gray-600">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="OTHER" id="other" className="text-primary border-gray-300" />
                      <Label htmlFor="OTHER" className="font-normal text-gray-600">Other</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PREFER_NOT_TO_SAY" id="prefer-not-to-say" className="text-primary border-gray-300" />
                      <Label htmlFor="PREFER_NOT_TO_SAY" className="font-normal text-gray-600">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={candidateData.address}
                      onChange={handleCandidateChange}
                      className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={candidateData.phoneNumber}
                      onChange={handleCandidateChange}
                      type="tel"
                      className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="font-medium text-gray-700 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Skills *
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={candidateData.skills}
                    onChange={handleCandidateChange}
                    placeholder="JavaScript, React, Node.js, UI/UX Design"
                    required
                    className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                  />
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <PenTool className="h-3 w-3" />
                    Separate skills with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation" className="font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Motivation Letter *
                  </Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={candidateData.motivation}
                    onChange={handleCandidateChange}
                    rows={5}
                    required
                    className="focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                    placeholder="Tell us about your career goals, what motivates you, and why you'd be a great fit for potential employers..."
                  />
                </div>

                <div className="space-y-4">
                  <Label className="font-medium text-gray-700 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education History
                  </Label>
                  <p className="text-sm text-gray-500 -mt-2">
                    Start with your most recent education first
                  </p>
                  {candidateData.education.map((edu, index) => (
                    <div key={index} className="space-y-3 border border-gray-200 p-4 rounded-lg bg-white">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Education #{index + 1}
                        </h4>
                        {index > 0 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeEducationField(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${index}`} className="text-gray-600">Institution *</Label>
                          <Input
                            id={`institution-${index}`}
                            name="institution"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="University of Technology"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`} className="text-gray-600">Degree/Certificate *</Label>
                          <Input
                            id={`degree-${index}`}
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="Bachelor of Science in Computer Science"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startYear-${index}`} className="text-gray-600">Start Year *</Label>
                          <Input
                            id={`startYear-${index}`}
                            name="startYear"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={edu.startYear}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="2018"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endYear-${index}`} className="text-gray-600">End Year (or expected)</Label>
                          <Input
                            id={`endYear-${index}`}
                            name="endYear"
                            type="number"
                            min="1900"
                            max="2100"
                            value={edu.endYear}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="2022"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addEducationField}
                    className="mt-2 gap-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" /> Add Education
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label className="font-medium text-gray-700 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Work Experience
                  </Label>
                  <p className="text-sm text-gray-500 -mt-2">
                    List your relevant work experience (most recent first)
                  </p>
                  {candidateData.workExperience.map((exp, index) => (
                    <div key={index} className="space-y-3 border border-gray-200 p-4 rounded-lg bg-white">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Experience #{index + 1}
                        </h4>
                        {index > 0 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeWorkExperienceField(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`} className="text-gray-600">Company Name *</Label>
                          <Input
                            id={`company-${index}`}
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleWorkExperienceChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="Tech Corp Inc."
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`} className="text-gray-600">Position *</Label>
                          <Input
                            id={`position-${index}`}
                            name="position"
                            value={exp.position}
                            onChange={(e) => handleWorkExperienceChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            placeholder="Frontend Developer"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`} className="text-gray-600">Start Date *</Label>
                          <Input
                            id={`startDate-${index}`}
                            name="startDate"
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleWorkExperienceChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`} className="text-gray-600">End Date (or present)</Label>
                          <Input
                            id={`endDate-${index}`}
                            name="endDate"
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => handleWorkExperienceChange(e, index)}
                            className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addWorkExperienceField}
                    className="mt-2 gap-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" /> Add Work Experience
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label className="font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Online Presence
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-gray-600 flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={candidateData.links.linkedin}
                        onChange={handleLinkChange}
                        className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                        placeholder="https://linkedin.com/in/yourprofile"
                        type="url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-gray-600 flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Profile
                      </Label>
                      <Input
                        id="github"
                        name="github"
                        value={candidateData.links.github}
                        onChange={handleLinkChange}
                        className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                        placeholder="https://github.com/yourusername"
                        type="url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="text-gray-600 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Portfolio Website
                      </Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        value={candidateData.links.portfolio}
                        onChange={handleLinkChange}
                        className="focus-visible:ring-2 focus-visible:ring-primary h-10"
                        placeholder="https://yourportfolio.com"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto" className="font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Profile Photo
                  </Label>
                  <div className="flex items-center gap-4">
                    <label 
                      htmlFor="profilePhoto"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max. 5MB)</p>
                      </div>
                      <Input 
                        id="profilePhoto" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    A professional headshot helps recruiters recognize you (recommended size: 400x400px)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" required className="h-4 w-4 text-primary rounded" />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg cursor-pointer font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-md flex items-center gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="h-5 w-5" />
                      Complete Profile
                    </>
                  )}
                </Button>
                </form>
              </TabsContent>

              <TabsContent value="employer">
                <form onSubmit={handleEmployerSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-medium text-gray-700 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={employerData.companyName}
                      onChange={handleEmployerChange}
                      required
                      className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="font-medium text-gray-700 flex items-center gap-2">
                        <ClipboardList className="h-5 w-5" />
                        Industry *
                      </Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={employerData.industry}
                        onChange={handleEmployerChange}
                        required
                        className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                        placeholder="Technology, Healthcare, Finance, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="font-medium text-gray-700 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Company Size *
                      </Label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={employerData.companySize}
                        onChange={handleEmployerChange}
                        required
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1001-5000">1001-5000 employees</option>
                        <option value="5000+">5000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear" className="font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Founded Year
                      </Label>
                      <Input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        value={employerData.foundedYear}
                        onChange={handleEmployerChange}
                        className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                        placeholder="1990"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="font-medium text-gray-700 flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Company Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={employerData.website}
                        onChange={handleEmployerChange}
                        className="focus-visible:ring-2 focus-visible:ring-primary h-12"
                        placeholder="https://yourcompany.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyDescription" className="font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Company Description *
                    </Label>
                    <Textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={employerData.companyDescription}
                      onChange={handleEmployerChange}
                      rows={4}
                      className="focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                      placeholder="Briefly describe your company's mission, values, and what makes you unique..."
                      required
                    />
                    <p className="text-sm text-gray-500">
                      This will be displayed on your company profile page
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLogo" className="font-medium text-gray-700 flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Company Logo *
                    </Label>
                    <div className="flex items-center gap-4">
                      <label 
                        htmlFor="companyLogo"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max. 5MB)</p>
                        </div>
                        <Input 
                          id="companyLogo" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileUpload} 
                          className="hidden" 
                          required
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Recommended size: 300x300 pixels. This will be displayed on your job postings.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="employerTerms" required className="h-4 w-4 text-primary rounded" />
                    <Label htmlFor="employerTerms" className="text-sm text-gray-600">
                      I agree to the Employer Terms of Service and confirm I have authorization to represent this company
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg cursor-pointer font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-md flex items-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <BadgeCheck className="h-5 w-5" />
                        Complete Employer Profile
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}

export default OnboardingPage