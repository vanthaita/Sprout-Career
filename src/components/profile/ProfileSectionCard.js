'use client';
import React, { Fragment } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from 'lucide-react';
import { SectionHeader } from './helpers'; 

const ProfileSectionCard = ({ title, data, onAddClick, onEditClick, onDeleteConfirm, renderItem, emptyText }) => {
    return (
        <Card className="shadow-lg mb-6">
            <CardHeader className="p-4">
                <SectionHeader title={title} onAdd={onAddClick} />
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <Fragment key={item.id || index}>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    {renderItem(item)}
                                </div>
                                <div className="flex space-x-1 flex-shrink-0">
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEditClick(item)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete this record.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => onDeleteConfirm(item.id)} className="bg-destructive hover:bg-destructive/90">
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            {index < data.length - 1 && <Separator className="my-4" />}
                        </Fragment>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground italic">{emptyText}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileSectionCard;