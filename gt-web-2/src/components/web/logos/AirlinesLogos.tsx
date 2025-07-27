import { AirlinesLogosProps } from "components";
import React from "react";
import { Box } from "theme-ui";



const AirlinesLogos: React.FC<AirlinesLogosProps> = ({
    names,
    width = 48,
    height = 32,
    imgClassName = "",
}) => {
    // Use all names if not provided

    return (
        <Box className="h-16 overflow-hidden relative flex items-center justify-center">
            <img
                key={names}
                src={`/images/Airline/${encodeURIComponent(names ?? '')}.svg`}
                alt={names}
                width={width}
                height={height}
                className={`${imgClassName}`}
                title={names}
                loading="lazy"
            />
        </Box>
    );
};

export default AirlinesLogos;
