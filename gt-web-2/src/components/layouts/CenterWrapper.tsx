"use client"
import { CenterProps } from 'components';
import { Box } from 'theme-ui';



const CenterWrapper = ({ children, className }: CenterProps) => {
    return (
        <Box
            as='div'
            className={`container mx-auto  ${className || ''}`}
        >
            {children}
        </Box>
    );
};

export default CenterWrapper;