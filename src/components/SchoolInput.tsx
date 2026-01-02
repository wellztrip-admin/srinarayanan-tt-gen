import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, Clock } from 'lucide-react';

interface SchoolInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  schedule: string;
  days: string;
  variant: 'A' | 'B';
}

export function SchoolInput({ label, value, onChange, schedule, days, variant }: SchoolInputProps) {
  const isSchoolA = variant === 'A';
  
  return (
    <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
      isSchoolA 
        ? 'bg-schoolA-light border-schoolA/30 hover:border-schoolA/50' 
        : 'bg-schoolB-light border-schoolB/30 hover:border-schoolB/50'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isSchoolA ? 'bg-schoolA/10' : 'bg-schoolB/10'}`}>
          <School className={`w-5 h-5 ${isSchoolA ? 'text-schoolA' : 'text-schoolB'}`} />
        </div>
        <Label className="text-lg font-display font-semibold text-foreground">{label}</Label>
      </div>
      
      <Input
        placeholder={`Enter ${label.toLowerCase()} name`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mb-4 bg-card border-border focus:ring-2 focus:ring-primary/20"
      />
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span className="font-medium">{schedule}</span>
        <span className="text-muted-foreground/60">•</span>
        <span>{days}</span>
      </div>
    </div>
  );
}
