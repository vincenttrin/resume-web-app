interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-lion-blue-50 text-lion-blue-600 border border-lion-blue-200">
      {label}
    </span>
  );
}
