import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const weeks = [1, 2, 3, 4, 5, 6];
const days = ["Push", "Pull", "Legs (Quads)", "Upper Body", "Legs (Glutes/Hamstrings)"];

const workouts = {
  "Push": [
    "Barbell Bench Press",
    "Machine Chest Press",
    "Incline Cable Fly",
    "Seated DB Shoulder Press",
    "Cable Lateral Raise",
    "Rope Triceps Pushdown",
    "Overhead Cable Triceps Extension"
  ],
  "Pull": [
    "Lat Pulldown / Pull-Up",
    "Chest-Supported Row",
    "Seated Cable Row",
    "Straight Arm Cable Pulldown",
    "Barbell Curl",
    "Seated Cable Curl",
    "Rope Hammer Curl"
  ],
  "Legs (Quads)": [
    "Barbell Back Squat",
    "Hack Squat",
    "Leg Press (Feet Low)",
    "Leg Extension",
    "Seated Calf Raise",
    "Standing Calf Raise"
  ],
  "Upper Body": [
    "Incline DB Press",
    "Pec Deck Fly",
    "Machine Shoulder Press",
    "Dumbbell Lateral Raise",
    "Chest-Supported Machine Row",
    "Cable Face Pulls",
    "Triceps Dips",
    "Cable Curl"
  ],
  "Legs (Glutes/Hamstrings)": [
    "Romanian Deadlift",
    "Seated Hamstring Curl",
    "Cable Glute Kickback",
    "Hip Thrust",
    "Walking DB Lunges",
    "Hanging Leg Raise / Ab Machine"
  ]
};

export default function TrainingApp() {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState("Push");
  const [log, setLog] = useState({});

  const handleInputChange = (exercise, field, value) => {
    setLog(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: value
      }
    }));
  };

  const toggleComplete = (exercise) => {
    setLog(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        done: !prev[exercise]?.done
      }
    }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {weeks.map(w => (
          <Button key={w} variant={week === w ? "default" : "outline"} onClick={() => setWeek(w)}>
            Week {w}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {days.map(d => (
          <Button key={d} variant={day === d ? "default" : "outline"} onClick={() => setDay(d)}>
            {d}
          </Button>
        ))}
      </div>

      <h2 className="text-xl font-semibold">{day} – Week {week}</h2>

      <div className="space-y-4">
        {workouts[day].map((exercise) => (
          <Card key={exercise} className="bg-white border">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{exercise}</span>
                <Button size="sm" onClick={() => toggleComplete(exercise)}>
                  {log[exercise]?.done ? "✓ Done" : "Mark Done"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Sets"
                  value={log[exercise]?.sets || ""}
                  onChange={(e) => handleInputChange(exercise, "sets", e.target.value)}
                />
                <Input
                  placeholder="Reps"
                  value={log[exercise]?.reps || ""}
                  onChange={(e) => handleInputChange(exercise, "reps", e.target.value)}
                />
                <Input
                  placeholder="Notes"
                  value={log[exercise]?.notes || ""}
                  onChange={(e) => handleInputChange(exercise, "notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
