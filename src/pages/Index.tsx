import { useState } from 'react';
import { TimetableForm } from '@/components/TimetableForm';
import { TimetableDisplay } from '@/components/TimetableDisplay';
import { FormData, TimetableCombination } from '@/types/timetable';
import { generateTimetableCombinations } from '@/utils/timetableGenerator';
import { exportToExcel } from '@/utils/excelExport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Shuffle, Download } from 'lucide-react';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [combinations, setCombinations] = useState<TimetableCombination[] | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleGenerate = (data: FormData) => {
    setFormData(data);
    const newCombinations = generateTimetableCombinations(
      data.schoolAName,
      data.schoolBName,
      data.teachers
    );
    setCombinations(newCombinations);
  };

  const handleRegenerate = () => {
    if (formData) {
      const newCombinations = generateTimetableCombinations(
        formData.schoolAName,
        formData.schoolBName,
        formData.teachers
      );
      setCombinations(newCombinations);
    }
  };

  const handleReset = () => {
    setCombinations(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Timetable Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Create optimized schedules for multiple schools
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!combinations ? (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Enter School & Teacher Details
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill in the school names and teacher information below. The system will generate 
                3 different timetable combinations using all teachers across both schools.
              </p>
            </div>
            
            <TimetableForm onGenerate={handleGenerate} />
          </div>
        ) : (
          <div className="animate-slide-up">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Form
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={handleRegenerate}
                  className="gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Regenerate
                </Button>
                <Button
                  variant="default"
                  onClick={() => exportToExcel(combinations, parseInt(selectedTab))}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export to Excel
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-accent/50 rounded-xl p-6 mb-8 border border-accent-foreground/10">
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Generated Timetables
              </h3>
              <p className="text-muted-foreground">
                Here are 3 different timetable combinations for <strong className="text-foreground">{formData?.schoolAName}</strong> (Morning: Mon-Sat) 
                and <strong className="text-foreground">{formData?.schoolBName}</strong> (Afternoon: Thu-Sat).
              </p>
            </div>

            {/* Timetable Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="1" 
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
                >
                  Combination 1
                </TabsTrigger>
                <TabsTrigger 
                  value="2" 
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
                >
                  Combination 2
                </TabsTrigger>
                <TabsTrigger 
                  value="3" 
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
                >
                  Combination 3
                </TabsTrigger>
              </TabsList>

              {combinations.map((combination) => (
                <TabsContent key={combination.id} value={combination.id.toString()}>
                  <TimetableDisplay combination={combination} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Timetable Generator • Optimized scheduling for educational institutions</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
