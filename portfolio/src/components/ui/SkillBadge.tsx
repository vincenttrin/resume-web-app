interface SkillBadgeProps {
  label: string;
  variant?: 'blue' | 'gold';
}

export default function SkillBadge({ label, variant = 'blue' }: SkillBadgeProps) {
  const variants = {
    blue: 'bg-lion-blue-100 text-lion-blue-700 border-lion-blue-200',
    gold: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
