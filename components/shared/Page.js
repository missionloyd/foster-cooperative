import React, { forwardRef } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import { motion } from "framer-motion";

const Page = forwardRef(({
  children,
  title = '',
  className = '',
  ...rest
}, ref) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={`app-container ${className}`}
      ref={ref}
      {...rest}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
    </motion.div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
