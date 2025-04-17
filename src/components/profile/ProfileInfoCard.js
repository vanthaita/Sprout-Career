// src/components/profile/ProfileInfoCard.jsx (NEW FILE)
'use client';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Save, UserSquare2, Trash2, CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO, isValid } from 'date-fns';
import { Label } from '@/components/ui/label'; // Import Label

const ProfileInfoCard = ({
    profileForm,
    onProfileSubmit,
    isSubmitting,
    serverError,
    profileData,
    otherLangFields,
    appendLang,
    removeLang,
    GenderType,
    JapaneseProficiencyLevel,
    ProficiencyLevel
}) => {

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                <Card className="shadow-lg mb-6">
                    <CardHeader className="bg-gray-50 border-b p-4">
                         <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">履歴書 (Profile)</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                 {profileData?.lastUpdatedAt ? `最終更新日: ${format(parseISO(profileData.lastUpdatedAt), 'yyyy年MM月dd日 HH:mm')}` : `現在`}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 space-y-6">
                         <section>
                            <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">基本情報 (Basic Information)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                                    <FormField control={profileForm.control} name="fullNameKana" render={({ field }) => ( <FormItem className="sm:col-span-3"><FormLabel className="text-xs">フリガナ (Kana)</FormLabel><FormControl><Input {...field} placeholder="ヤマダ タロウ" value={field.value || ''} className="h-8 text-sm" /></FormControl><FormMessage className="text-xs"/></FormItem>)} />
                                    <FormField control={profileForm.control} name="fullNameKanji" render={({ field }) => ( <FormItem className="sm:col-span-3"><FormLabel>氏名 (Kanji Name)</FormLabel><FormControl><Input {...field} placeholder="山田 太郎" value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={profileForm.control} name="dateOfBirth" render={({ field }) => (
                                         <FormItem className="flex flex-col"><FormLabel>生年月日 (Birth Date)</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild><FormControl>
                                                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-9", !field.value && "text-muted-foreground")}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value && isValid(new Date(field.value)) ? format(new Date(field.value), "yyyy年MM月dd日") : <span>日付を選択</span>}
                                                    </Button>
                                                </FormControl></PopoverTrigger>
                                                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : null)} captionLayout="dropdown-buttons" fromYear={1950} toYear={new Date().getFullYear()} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus/></PopoverContent>
                                            </Popover><FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={profileForm.control} name="gender" render={({ field }) => ( <FormItem><FormLabel>性別 (Gender)</FormLabel><Select onValueChange={field.onChange} value={field.value || ''}><FormControl><SelectTrigger className="h-9"><SelectValue placeholder="性別を選択" /></SelectTrigger></FormControl><SelectContent>{Object.entries(GenderType).map(([key, value]) => ( <SelectItem key={key} value={value}>{value}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                     <div className="sm:col-span-3"><FormField control={profileForm.control} name="currentAddressJp" render={({ field }) => ( <FormItem><FormLabel>現住所 (Address)</FormLabel><FormControl><Input {...field} placeholder="〒100-0001 東京都千代田区..." value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} /></div>
                                      <FormField control={profileForm.control} name="phoneNumber" render={({ field }) => ( <FormItem><FormLabel>電話番号 (Phone)</FormLabel><FormControl><Input {...field} type="tel" placeholder="090-XXXX-XXXX" value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                      <FormField control={profileForm.control} name="email" render={({ field }) => ( <FormItem className="sm:col-span-2"><FormLabel>メール (Email)</FormLabel><FormControl><Input {...field} type="email" placeholder="yamada@example.com" value={field.value || ''} readOnly disabled /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                                <div className="md:col-span-1 flex flex-col items-center md:items-start">
                                     <FormField control={profileForm.control} name="profilePhotoUrl" render={({ field }) => (
                                        <FormItem className="w-full flex flex-col items-center md:items-start">
                                            <FormLabel className="text-xs text-muted-foreground mb-1">写真 (Photo)</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center justify-center h-28 w-24 border bg-muted rounded text-muted-foreground mb-2">
                                                    {field.value ? <img src={field.value} alt="Preview" className="h-full w-full object-cover rounded"/> : <UserSquare2 className="h-8 w-8"/>}
                                                </div>
                                            </FormControl>
                                            <FormControl><Input {...field} placeholder="Photo URL" value={field.value || ''} className="h-8 text-xs" /></FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                        </section>

                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <section>
                                     <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">志望動機 (Motivation)</h3>
                                     <FormField control={profileForm.control} name="motivation" render={({ field }) => ( <FormItem><FormControl><Textarea {...field} placeholder="あなたの志望動機..." rows={5} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                </section>
                                <section>
                                     <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">自己PR (Self Promotion)</h3>
                                     <FormField control={profileForm.control} name="selfPromotion" render={({ field }) => ( <FormItem><FormControl><Textarea {...field} placeholder="あなたの強みやスキル..." rows={5} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                </section>
                            </div>
                            <div className="lg:col-span-1 space-y-6">
                                <section>
                                    <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">趣味・特技 (Hobbies/Skills)</h3>
                                    <FormField control={profileForm.control} name="hobbies" render={({ field }) => ( <FormItem><FormControl><Textarea {...field} placeholder="あなたの趣味や特技..." rows={3} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                </section>
                                <section>
                                    <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">本人希望記入欄 (Requests)</h3>
                                    <FormField control={profileForm.control} name="candidateRequests" render={({ field }) => ( <FormItem><FormControl><Textarea {...field} placeholder="給与、勤務地、職種など..." rows={4} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                                </section>
                                <section>
                                    <h3 className="text-base font-semibold text-muted-foreground mb-3 border-b pb-1">語学スキル (Language)</h3>
                                    <div className="space-y-4">
                                        <FormField control={profileForm.control} name="japaneseProficiency" render={({ field }) => ( <FormItem><FormLabel className="text-sm">日本語能力 (Japanese)</FormLabel><Select onValueChange={field.onChange} value={field.value || ''}><FormControl><SelectTrigger className="h-9"><SelectValue placeholder="レベルを選択" /></SelectTrigger></FormControl><SelectContent>{Object.entries(JapaneseProficiencyLevel).map(([key, value]) => (<SelectItem key={key} value={value}>{value}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block">他の言語 (Other)</Label>
                                            <div className="space-y-2">
                                                {otherLangFields.map((item, index) => (
                                                    <div key={item.id} className="flex items-end gap-2 p-2 border rounded">
                                                        <FormField control={profileForm.control} name={`otherLanguages.${index}.language`} render={({ field }) => ( <FormItem className="flex-1"><FormLabel className="sr-only">Lang</FormLabel><FormControl><Input {...field} placeholder="Language" value={field.value || ''} className="h-8" /></FormControl><FormMessage className="text-xs"/></FormItem>)} />
                                                        <FormField control={profileForm.control} name={`otherLanguages.${index}.proficiency`} render={({ field }) => ( <FormItem className="w-[120px]"><FormLabel className="sr-only">Level</FormLabel><Select onValueChange={field.onChange} value={field.value || 'NONE'}><FormControl><SelectTrigger className="h-8"><SelectValue placeholder="Level" /></SelectTrigger></FormControl><SelectContent>{Object.entries(ProficiencyLevel).map(([key, value]) => (<SelectItem key={key} value={value}>{value}</SelectItem>))}</SelectContent></Select><FormMessage className="text-xs"/></FormItem>)} />
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeLang(index)} className="h-8 w-8 shrink-0"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" size="sm" onClick={() => appendLang({ language: '', proficiency: 'NONE' })} className="mt-2 text-xs h-8">+ Add Language</Button>
                                            </div>
                                             <FormField control={profileForm.control} name="otherLanguages" render={({ field }) => <FormMessage></FormMessage>} />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                       <div className="flex flex-col sm:flex-row justify-end items-center gap-2 w-full">
                            {serverError && ( <p className="text-sm text-destructive mr-auto">Error: {serverError}</p> )}
                            <Button type="submit" size="sm" disabled={isSubmitting} className="w-full sm:w-auto">
                                {isSubmitting ? ( <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Saving Profile...</> )
                                          : ( <><Save className="mr-1 h-4 w-4" /> Save Profile Changes</> )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ProfileInfoCard;