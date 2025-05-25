import React from 'react';
import JobFilters from './job.filters';
import JobList from './job.list';

const JobsPageLayout = () => {
  return (
    <div className="px-4 py-8"> 
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"> 
        <div className="lg:col-span-1">
          <JobFilters />
        </div>
        <div className="lg:col-span-3">
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default JobsPageLayout;