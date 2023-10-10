import React from "react";

interface HeadingProps {
    title: string;
    description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
    return (
        <div>
            <div className="text-3xl font-bold tracking-tight">{title}</div>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};

export default Heading;
