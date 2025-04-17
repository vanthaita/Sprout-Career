// src/components/profile/ProfileItemModal.jsx (NEW FILE)
'use client';
import React from 'react';
import {
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox"; // Import if using Checkbox
import { SectionFooter, DatePickerField } from './helpers'; // Assuming helpers are in the same folder

const ProfileItemModal = ({
    modalState,
    isSubmitting,
    onClose,
    onSubmitHandlers,
    forms,
    ProficiencyLevel // Only needed if language modal is ever created, otherwise remove
}) => {
    const { open, type, mode, error } = modalState;

    const getForm = () => forms[type];
    const getSubmitHandler = () => onSubmitHandlers[type];

    const titleCase = (str) => str?.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()) || '';

    if (!type || !getForm() || !getSubmitHandler()) return null; // Don't render if type is invalid

    const currentForm = getForm();
    const currentSubmitHandler = getSubmitHandler();

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{mode === 'add' ? 'Add' : 'Edit'} {titleCase(type)}</DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you&lsquo;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...currentForm}>
                    <form onSubmit={currentForm.handleSubmit(currentSubmitHandler)} className="space-y-4 py-4">
                        {/* Education Form Fields */}
                        {type === 'education' && (
                            <>
                                <FormField control={currentForm.control} name="schoolName" render={({ field }) => <FormItem><FormLabel>School Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="degreeOrStatus" render={({ field }) => <FormItem><FormLabel>Degree/Status</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={currentForm.control} name="startDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} label="開始日を選択" disabledFuture={true} /><FormMessage /></FormItem>} />
                                    <FormField control={currentForm.control} name="endDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>End Date (Leave blank if current)</FormLabel><DatePickerField field={field} label="終了日を選択" /><FormMessage /></FormItem>} />
                                </div>
                                <FormField control={currentForm.control} name="location" render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="description" render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} rows={3} /></FormControl><FormMessage /></FormItem>} />
                            </>
                        )}

                        {/* Work Experience Form Fields */}
                        {type === 'workExperience' && (
                            <>
                                <FormField control={currentForm.control} name="companyName" render={({ field }) => <FormItem><FormLabel>Company Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="position" render={({ field }) => <FormItem><FormLabel>Position *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField control={currentForm.control} name="startDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><DatePickerField field={field} label="開始日を選択" disabledFuture={true} /><FormMessage /></FormItem>} />
                                     <FormField control={currentForm.control} name="endDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>End Date (Leave blank if current)</FormLabel><DatePickerField field={field} label="終了日を選択" /><FormMessage /></FormItem>} />
                                </div>
                                <FormField control={currentForm.control} name="location" render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="description" render={({ field }) => <FormItem><FormLabel>Description / Responsibilities</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} rows={4} /></FormControl><FormMessage /></FormItem>} />
                            </>
                        )}

                        {/* Qualification Form Fields */}
                         {type === 'qualification' && (
                            <>
                                <FormField control={currentForm.control} name="name" render={({ field }) => <FormItem><FormLabel>Qualification/License Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="issuingOrganization" render={({ field }) => <FormItem><FormLabel>Issuing Organization</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField control={currentForm.control} name="issueDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Issue Date</FormLabel><DatePickerField field={field} label="取得日を選択" disabledFuture={true}/><FormMessage /></FormItem>} />
                                     <FormField control={currentForm.control} name="expirationDate" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Expiration Date (Optional)</FormLabel><DatePickerField field={field} label="有効期限を選択" /><FormMessage /></FormItem>} />
                                </div>
                                <FormField control={currentForm.control} name="credentialId" render={({ field }) => <FormItem><FormLabel>Credential ID</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="credentialUrl" render={({ field }) => <FormItem><FormLabel>Credential URL</FormLabel><FormControl><Input type="url" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
                             </>
                         )}

                        {/* CV Form Fields */}
                        {type === 'cv' && (
                            <>
                                <FormField control={currentForm.control} name="fileName" render={({ field }) => <FormItem><FormLabel>File Name *</FormLabel><FormControl><Input {...field} placeholder="e.g., Rirekisho_YamadaTaro.pdf" /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="fileUrl" render={({ field }) => <FormItem><FormLabel>File URL *</FormLabel><FormControl><Input type="url" {...field} placeholder="https://example.com/cv.pdf" /></FormControl><FormDescription>Link to your CV file (e.g., Google Drive, Dropbox).</FormDescription><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="fileType" render={({ field }) => <FormItem><FormLabel>File Type</FormLabel><FormControl><Input {...field} value={field.value ?? ''} placeholder="e.g., PDF, DOCX" /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={currentForm.control} name="notes" render={({ field }) => <FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} rows={3} placeholder="Optional notes about this CV." /></FormControl><FormMessage /></FormItem>} />
                                {/* Example Checkbox if needed */}
                                {/* <FormField control={currentForm.control} name="isPrimary" render={({ field }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Set as Primary CV</FormLabel><FormDescription>Mark this as your main CV to be shared.</FormDescription></div><FormMessage /></FormItem>} /> */}
                             </>
                         )}

                        <SectionFooter isSaving={isSubmitting} onCancel={onClose} serverError={error} />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileItemModal;