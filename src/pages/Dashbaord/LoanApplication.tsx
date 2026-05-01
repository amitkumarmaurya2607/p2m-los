'use client'
import React, { useState } from 'react';
import { Check, Phone, Mail, MapPin, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import InputBox from '@/components/ui/TextInput';
import SelectBox from '@/components/ui/SelectBox';
import DatePickerBox from '@/components/ui/DatePickerBox';

const LoanApplication = () => {

  const [startDate, setStartDate] = useState(null);
  return (
    // bg-muted/30 uses your --muted variable with 30% opacity
    <div className="min-h-screen bg-muted/30 p-6 md:p-12 font-sans text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Tips and Help */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Application Tips Card */}
          <div className="bg-background border border-border rounded-md shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Application Tips</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Follow these tips for a smooth application process
            </p>
            
            <ul className="space-y-4">
              {[
                "Have your ID ready",
                "Provide accurate bank account information",
                "Double-check your income details",
                "Ensure your phone is nearby for verification"
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  {/* Using primary color for checkmarks to match your brand */}
                  <Check size={18} className="text-secondary mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Need Help Card */}
          <div className="bg-background border border-border rounded-md shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              {/* Using accent background with primary colored icon */}
              <div className="p-2 bg-secondary/20 rounded-full text-secondary">
                <HelpCircle size={24} className="text-secondary" />
              </div>
              <h2 className="text-xl font-bold">Need Help?</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Our support team is ready to assist you</p>
            
            <div className="space-y-5">
              <ContactItem icon={<Phone size={18} />} title="Call us" value="+91 7428861967" />
              <ContactItem icon={<Mail size={18} />} title="Email" value="info@crednidhi.com" />
              <ContactItem icon={<MapPin size={18} />} title="Address" value="6th Floor, 612 - 615, Pearls Omaxe" />
            </div>
          </div>
        </div>

        {/* Right Column: Main Form */}
        <div className="md:col-span-8 bg-background border border-border rounded-md shadow-sm p-8 md:p-16 flex flex-col justify-center">
          <form className="space-y-6 max-w-2xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBox 
                label="Account Number" 
                placeholder="e.g. 123456789012" 
                required 
                variant="normal"
              />
              <InputBox 
                label="IFSC Code" 
                placeholder="E.G. SBIN0001234" 
                required 
                variant="normal"
              />
            </div>

            <InputBox 
              label="Account Type" 
              defaultValue="SAVINGS" 
             variant="normal" 
              className="uppercase"
            />
            <InputBox 
              label="Account Type" 
              defaultValue="SAVINGS" 
             variant="floating-inside" 
              className="uppercase"
            />
            <InputBox 
              label="Account Type" 
              defaultValue="SAVINGS" 
             variant="floating" 
              className="uppercase"
            />
           
            
            <SelectBox 
  label="Country" 
  variant="normal" 
  error="Required field"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ]} 
/>
            <SelectBox 
  label="Country" 
  variant="floating" 
  error="Required field"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ]} 
/>
            <SelectBox 
  label="Country" 
 variant="floating-inside"
  error="Required field"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ]} 
/>



<DatePickerBox
  label="Appointment Date"
  variant="floating"
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  required
  error={!startDate ? "Please select a date" : ""}
/>
<DatePickerBox
  label="Appointment Date"
  variant="normal"
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  required
  error={!startDate ? "Please select a date" : ""}
/>
<DatePickerBox
  label="Appointment Date"
 variant="floating-inside"
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  required
  error={!startDate ? "Please select a date" : ""}
/>
            {/* Button now uses --primary and --primary-foreground */}
            <button 
              type="submit"
              className={cn(
                "w-full bg-primary text-primary-foreground font-bold py-4 transition-all shadow-md mt-4",
                "hover:opacity-90 active:scale-[0.98]",
                "rounded-md" // linked to --radius
              )}
            >
              Save & Verify
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-accent rounded-md text-primary">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{title}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  </div>
);

export default LoanApplication;