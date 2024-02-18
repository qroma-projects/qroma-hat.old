import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div class="card">
          <div class="card__header">
            <p className="qroma__tagline">qroma.dev - embedded device development and deployment. streamlined. simple.</p>
          </div>
          <div class="card__header">
            <div class="row">
              <div class="col">
                <div class="col-demo">
                  <Link
                    className="button button--secondary button--lg"
                    to="https://qroma.dev"
                    >
                    Software built with qroma.dev
                  </Link>                
                </div>
              </div>
              <div class="col">
                <div class="col-demo">
                  <Link
                    className="button button--secondary button--lg"
                    to="https://docusaurus.io"
                    >
                    Site built with Docusaurus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} (a qroma project)`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}