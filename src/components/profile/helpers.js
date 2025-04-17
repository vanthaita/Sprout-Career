'use client';
import { cn } from '@/lib/utils';
import { format, parseISO, isValid } from 'date-fns';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from '@/components/ui/form';
import { Loader2, Save, X, PlusCircle, UserSquare2, CalendarIcon } from 'lucide-react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

export const SectionHeader = ({ title, onAdd, className }) => (
    <div className={cn("flex justify-between items-center mb-3 border-b pb-1", className)}>
        <h3 className="text-base font-semibold text-muted-foreground">{title}</h3>
        {onAdd && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onAdd}>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Add {title}</span>
            </Button>
        )}
    </div>
);

export const SectionFooter = ({ isSaving, onCancel, serverError }) => (
    <DialogFooter className="sm:justify-end gap-2 border-t pt-3 mt-4">
         {serverError && ( <p className="text-sm text-destructive mr-auto w-full text-left mb-2 sm:mb-0">Error: {serverError}</p> )}
        <DialogClose asChild>
            <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isSaving} className="w-full sm:w-auto">
                <X className="mr-1 h-4 w-4" /> Cancel
            </Button>
        </DialogClose>
        <Button type="submit" size="sm" disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? ( <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Saving...</> )
                      : ( <><Save className="mr-1 h-4 w-4" /> Save</> )}
        </Button>
    </DialogFooter>
);

export const DatePickerField = ({ field, label, disabledFuture = false, disabledPast = false }) => (
    <Popover>
        <PopoverTrigger asChild>
            <FormControl>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal h-9",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value && isValid(new Date(field.value)) ? format(new Date(field.value), "yyyy年MM月dd日") : <span>{label}</span>}
                </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date || null)}
                disabled={(date) =>
                  (disabledFuture && date > new Date()) ||
                  (disabledPast && date < new Date("1900-01-01"))
                }
                captionLayout="dropdown-buttons" fromYear={1950} toYear={new Date().getFullYear() + 5}
                initialFocus
            />
        </PopoverContent>
    </Popover>
);

export const formatDateRange = (start, end) => {
    const startDate = start && isValid(parseISO(start)) ? format(parseISO(start), "yyyy/MM") : "N/A";
    const endDate = end && isValid(parseISO(end)) ? format(parseISO(end), "yyyy/MM") : "現在";
    return `${startDate} - ${endDate}`;
};
export const formatDateSingle = (date) => {
    return date && isValid(parseISO(date)) ? format(parseISO(date), "yyyy/MM/dd") : "N/A";
};