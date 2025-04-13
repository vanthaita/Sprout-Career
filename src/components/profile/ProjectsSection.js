import React from 'react';
import { SectionCard } from './SectionCard';
import { ProjectCardDisplay } from './ProjectCardDisplay'; 

export const ProjectsSection = ({ projects }) => {
    return (
        <SectionCard title="成果物" id="achievements">
            <div className="space-y-6">
                {projects.map((proj, index) => (
                    <ProjectCardDisplay key={index} {...proj} />
                 ))}
            </div>
        </SectionCard>
    );
};