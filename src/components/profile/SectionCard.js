import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaEdit } from 'react-icons/fa';

export const SectionCard = ({ title, children, onEditClick, id }) => {
    return (
        <Card id={id} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-semibold text-gray-700">{title}</CardTitle>
                <Button variant="link" size="sm" className="text-[#3A6B4C] h-auto p-0" onClick={onEditClick}>
                    <FaEdit className="mr-1 h-3 w-3" /> 編集
                </Button>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};