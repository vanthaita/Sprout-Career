import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
          What is Japan Dev?
        </h2>

        <div className="space-y-6 text-slate-700 text-lg leading-relaxed"> 
          <p>
            Japan Dev is a <strong className="font-semibold">job board</strong> that
            showcases tech jobs in Japan — mostly for{' '}
            <strong className="font-semibold">English-speaking software developers</strong>.
          </p>

          <p>
            You&apos;ll find{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              hand-curated tech jobs
            </a>{' '}
            at <strong className="font-semibold">global companies</strong> and{' '}
            <strong className="font-semibold">Silicon Valley-style startups</strong> in
            Japan. Most positions accept applications from outside Japan, and
            very few require fluent Japanese skills.
          </p>

          <p>
            Also, we only post <strong className="font-semibold">vetted positions</strong>{' '}
            that offer a <strong className="font-semibold">positive work environment</strong>{' '}
            for foreign software developers and tech professionals — in fact,{' '}
            <strong className="font-semibold">
              we turn away 90% of companies
            </strong>{' '}
            that ask to post jobs on Japan Dev.
          </p>

          <p>
            So if you want to work in tech in Japan but{' '}
            <em className="font-medium">avoid the negative parts</em> of Japan&lsquo;s work
            culture, this site is for you.
          </p>

          <p>
            Want to learn more about working in Japan?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Check out our blog
            </a>{' '}
            for actionable insights on finding{' '}
            <strong className="font-semibold">top-tier tech jobs</strong> based on our
            own experiences working in Japan.
          </p>

          <p>
            We also maintain a list of{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              top tech companies in Japan
            </a>
            . We want to help you find the tech job in Japan that&lsquo;s right for
            you — and avoid the ones that aren&lsquo;t.
          </p>

          <p>
            Our goal is to help you achieve success in Japan. We won&lsquo;t be
            satisfied until everyone who wants to work in tech here can find a
            job at a company that values them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;