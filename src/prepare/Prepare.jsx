import React from 'react';
import './Prepare.css'; // Import CSS file for styling

function Prepare() {
  return (
    <div>
      <div className="header">
        <h1>Your Preparation</h1>
      </div>
      <div className="card">
        <h2 className="highlight">New Skill</h2>
        <p>Add your first skill</p>
        <p>Explore and add your first skill to get started. HackerRank offers a variety of skills, tracks, and tutorials for you to learn and improve.</p>
      </div>
      <div className="card">
        <h2 className="highlight">Certification</h2>
        <p>Take the HackerRank Certification Test and make your profile stand out</p>
        <p>Stand out from the crowd</p>
      </div>
      <div className="header">
        <h1>Prepare By Topics</h1>
      </div>
      <div className="grid-container">
        {/* Wrap each topic with an anchor tag */}
        <a href="/domain/algorithms" className="card smaller red">
          <h2>Algorithms</h2>
        </a>
        <a href="/domain/data-structures" className="card smaller blue">
          <h2>Data Structures</h2>
        </a>
        <a href="/domain/mathematics" className="card smaller green">
          <h2>Mathematics</h2>
        </a>
        <a href="/domain/artificial-intelligence" className="card smaller purple">
          <h2>Artificial Intelligence</h2>
        </a>
        <a href="/domain/c" className="card smaller orange">
          <h2>C</h2>
        </a>
        <a href="/domain/cpp" className="card smaller yellow">
          <h2>C++</h2>
        </a>
        <a href="/domain/java" className="card smaller pink">
          <h2>Java</h2>
        </a>
        <a href="/domain/python" className="card smaller turquoise">
          <h2>Python</h2>
        </a>
        <a href="/domain/ruby" className="card smaller indigo">
          <h2>Ruby</h2>
        </a>
        <a href="/domain/sql" className="card smaller lime">
          <h2>SQL</h2>
        </a>
        <a href="/domain/databases" className="card smaller cyan">
          <h2>Databases</h2>
        </a>
        <a href="/domain/linux-shell" className="card smaller teal">
          <h2>Linux Shell</h2>
        </a>
        <a href="/domain/functional-programming" className="card smaller lavender">
          <h2>Functional Programming</h2>
        </a>
        <a href="/domain/regex" className="card smaller magenta">
          <h2>Regex</h2>
        </a>
      </div>
    </div>
  );
}

export default Prepare;
