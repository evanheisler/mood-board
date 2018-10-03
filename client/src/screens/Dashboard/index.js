import React from 'react';
import Projects from './Projects';
import Placeholder from 'Placeholder';

const Dashboard = ({ auth, ...rest }) =>
  auth.isAuthenticated() ? <Projects /> : <Placeholder />;

export default Dashboard;
