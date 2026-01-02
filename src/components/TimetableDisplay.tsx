import { TimetableCombination } from '@/types/timetable';
import { getSubjectColor } from '@/utils/timetableGenerator';
import { Calendar, Sun, Moon } from 'lucide-react';

interface TimetableDisplayProps {
  combination: TimetableCombination;
}

export function TimetableDisplay({ combination }: TimetableDisplayProps) {
  const { schoolA, schoolB } = combination;
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* School A Timetable */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-schoolA-light border-b border-schoolA/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-schoolA/10">
              <Calendar className="w-5 h-5 text-schoolA" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {schoolA.school.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sun className="w-4 h-4 text-morning" />
                <span>Morning Session (4 Classes)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                {[1, 2, 3, 4].map((period) => (
                  <th key={period} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Period {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schoolA.schedule.map((daySchedule, idx) => (
                <tr key={daySchedule.day} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-4 py-3 font-medium text-foreground">{daySchedule.day}</td>
                  {daySchedule.slots.map((slot) => (
                    <td key={slot.period} className="px-4 py-3">
                      <div className={`px-3 py-2 rounded-lg border text-center text-sm ${getSubjectColor(slot.subject)}`}>
                        <div className="font-semibold">{slot.subject}</div>
                        <div className="text-xs opacity-80">{slot.teacher.name}</div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* School B Timetable */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="bg-schoolB-light border-b border-schoolB/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-schoolB/10">
              <Calendar className="w-5 h-5 text-schoolB" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {schoolB.school.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Moon className="w-4 h-4 text-afternoon" />
                <span>Afternoon Session (4 Classes)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                {[1, 2, 3, 4].map((period) => (
                  <th key={period} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Period {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schoolB.schedule.map((daySchedule, idx) => (
                <tr key={daySchedule.day} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-4 py-3 font-medium text-foreground">{daySchedule.day}</td>
                  {daySchedule.slots.map((slot) => (
                    <td key={slot.period} className="px-4 py-3">
                      <div className={`px-3 py-2 rounded-lg border text-center text-sm ${getSubjectColor(slot.subject)}`}>
                        <div className="font-semibold">{slot.subject}</div>
                        <div className="text-xs opacity-80">{slot.teacher.name}</div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
