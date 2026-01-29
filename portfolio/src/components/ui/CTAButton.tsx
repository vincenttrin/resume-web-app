import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  external?: boolean;
}

export default function CTAButton({
  href,
  variant = 'primary',
  children,
  external = false,
}: CTAButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105';

  const variants = {
    primary:
      'bg-lion-gold text-white hover:bg-lion-gold-light shadow-lg hover:shadow-xl',
    secondary:
      'bg-white text-lion-blue-700 border-2 border-lion-blue-700 hover:bg-lion-blue-50',
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
