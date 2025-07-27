// src/utils/paymentLogos.ts
import { PaymentLogoProps, PaymentMethod } from 'components';
import Image from 'next/image';



export const PaymentLogo: React.FC<PaymentLogoProps> = ({
    method,
    width = 48,
    height = 32,
    className = '',
    alt
}) => {
    const logoPath = `/images/logo-border/${method}.svg`;
    const defaultAlt = `${method.charAt(0).toUpperCase() + method.slice(1)} payment method`;

    return (
        <Image
            src={logoPath}
            alt={alt || defaultAlt}
            width={width}
            height={height}
            className={className}
        />
    );
};

// Utility function to render multiple payment logos
export const PaymentLogos: React.FC<{
    methods: PaymentMethod[];
    width?: number;
    height?: number;
    className?: string;
    gap?: number;
}> = ({ methods, width = 48, height = 32, className = '', gap = 8 }) => {
    return (
        <div className={`flex items-center ${className}`} style={{ gap: `${gap}px` }}>
            {methods.map((method) => (
                <PaymentLogo
                    key={method}
                    method={method}
                    width={width}
                    height={height}
                />
            ))}
        </div>
    );
};

