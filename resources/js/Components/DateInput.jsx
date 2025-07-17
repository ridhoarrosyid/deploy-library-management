'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DateInput({ data, setData, id, name }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button variant="outline" id="date" className="w-48 justify-between font-normal">
          {data ? data.toLocaleDateString('id-ID') : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={data}
          selected={data}
          captionLayout="dropdown"
          onSelect={(date) => {
            setData(name, date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
