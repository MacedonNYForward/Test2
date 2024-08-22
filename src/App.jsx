import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select } from './components/ui/select';
import { Checkbox } from './components/ui/checkbox';

const projects = [
  {
    title: "Enhance Veterans Memorial Park for Events and Community Use",
    description: "Create signature performance structure, relocate and enhance memorial, and improve access and circulation through the park",
    location: "28 North Ave.",
    nyfRequest: 1700000
  },
  {
    title: "Create a sense of place through Streetscape Enhancements on Main Street",
    description: "Enhance crosswalks, lighting, and sidewalks on Main Street from Corning Park to Kircher Park",
    location: "Main Street",
    nyfRequest: 1300000
  },
  {
    title: "Create a Celebration Plaza and Village Market Square",
    description: "Transform entry drive into Celebration Plaza adjacent to Village Office that acts as a public gathering space and gateway to flexible open space for markets and events.",
    location: "28 West Main St.",
    nyfRequest: 1125000
  },
  {
    title: "Establish Harmony Square on Main Street",
    description: "Create a flexible open space adjacent to Harmony House that incorporates public art and ties in to a connected network of public spaces",
    location: "58 East Main St.",
    nyfRequest: 325000
  },
  {
    title: "Create a Hojack Trail Gateway and Enhance the Trail",
    description: "Add amenities and enhance the crossing at North Avenue; pave the trail from Phillips Road to western Village boundary and add lighting, landscaping, and benches",
    location: "Hojack Trail",
    nyfRequest: 2052000
  }
];

const criteria = [
  { name: 'Level of Impact', description: 'This project will have a significant positive impact on downtown Webster and could spur additional investment.', weight: 1 },
  { name: 'Benefits to the Community', description: 'This project will result in benefits to the broader community, beyond just the project sponsor.', weight: 1 },
  { name: 'Cost-Effectiveness', description: 'This project is a good use of public funds and the budget is reasonable.', weight: 1 },
  { name: 'Readiness', description: 'This project is well-developed and can be ready to break ground in a timely manner.', weight: 1 },
  { name: 'Alignment with State Goals', description: 'This project advances one or more of the State\'s goals for the NY Forward program including: (1) Enhancing downtown living and quality of life; (2) Creating an active downtown with a mix of uses; (3) Providing a diverse mix of employment opportunities; (4) Creating diverse housing options for all income levels; (5) Providing public spaces that serve all ages and abilities; (6) Encouraging the reduction of greenhouse gas emissions; and (7) Growing the local property tax base.', weight: 1 },
  { name: 'Improving Connectivity', description: 'This project will improve convenience, functionality, walkability, or bikeability for residents and visitors to downtown Webster.', weight: 0.2 },
  { name: 'Beautifying Downtown', description: 'This project will help provide a cohesive and appealing community experience in downtown Webster.', weight: 0.2 },
  { name: 'Supporting Events and Programming', description: 'This project supports events or provides venues that will attract visitors from throughout the community to downtown Webster.', weight: 0.2 },
  { name: 'Enhancing Quality of Life for All', description: 'This project makes downtown Webster a vibrant place to live and work for all members of the community.', weight: 0.2 },
  { name: 'Promoting Sustainability', description: 'This project promotes sustainable development, energy efficiency, or the reduction of greenhouse gas emissions.', weight: 0.2 }
];

const ProjectEvaluationApp = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [currentProject, setCurrentProject] = useState(0);
  const [evaluations, setEvaluations] = useState(projects.map(() => ({})));
  const [projectScores, setProjectScores] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [totalNYFRequest, setTotalNYFRequest] = useState(0);

  useEffect(() => {
    const newProjectScores = evaluations.map((evaluation) => {
      let score = 0;
      criteria.forEach((criterion) => {
        if (evaluation[criterion.name]) {
          score += (evaluation[criterion.name] === 'High' ? 3 : evaluation[criterion.name] === 'Medium' ? 2 : 1) * criterion.weight;
        }
      });
      return score;
    });
    setProjectScores(newProjectScores);
  }, [evaluations]);

  useEffect(() => {
    const total = selectedProjects.reduce((sum, project) => sum + projects[project].nyfRequest, 0);
    setTotalNYFRequest(total);
  }, [selectedProjects]);

  const handleEvaluationChange = (criterionName, value) => {
    setEvaluations(prevEvaluations => {
      const newEvaluations = [...prevEvaluations];
      newEvaluations[currentProject] = {
        ...newEvaluations[currentProject],
        [criterionName]: value
      };
      return newEvaluations;
    });
  };

  const handleProjectSelection = (index) => {
    setSelectedProjects(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const renderFooter = () => (
    <footer className="mt-8 p-4 bg-gray-100 text-gray-600 text-center mb-8">
      Webster NY Forward
    </footer>
  );

  const renderProjectHeader = () => (
    <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 inline-block mb-4">
      Project {currentProject + 1} of {projects.length}
    </div>
  );

  const renderIntroduction = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">LPC Project Evaluation Survey</h1>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <p className="mb-4">
          This survey will walk you through a two-step process for evaluating the proposed projects. It is designed to help you identify the projects you think are most competitive for funding, in addition to the projects that could be removed from consideration.
        </p>
        <p className="mb-4">
          <strong>Step 1:</strong> You will evaluate each project based on how well it aligns with the evaluation criteria established by the State and the LPC, using a scale of High, Medium, Low. Your answers will be aggregated and used to sort each project into three categories: High Rating projects that you scored the highest, Medium Rating projects that you scored moderately-well, and Low Rating projects that you scored the lowest.
        </p>
        <p className="mb-4">
          <strong>Step 2:</strong> You will go through the exercise of deciding which projects you want to fund. As you select projects, a calculator will automatically sum the total NY Forward Request amount. You will only be able to submit your survey if the total NY Forward Request amount is between $6 million to $8 million. 
        </p>
        <p className="mb-4">
          <i>Note: This is only an exercise. Your selections in this exercise are not definitive. There will be on-going discussions at the upcoming LPC meetings to narrow down the list of projects.</i>
        </p>
        <h2 className="text-xl font-bold mb-2">How We Will Use This Data</h2>
        <p className="mb-4">
          The evaluations from all LPC members will be aggregated to create an overall rating for each project, either High, Medium, or Low. At LPC Meeting 5, we will present which projects fell into each of the High Rating, Medium Rating, and Low Rating categories. This will help the LPC make decisions about which projects to keep under consideration for potential funding and which projects could be removed. 
        </p>
        <p className="mb-4">
          <i>Note: Your individual responses will remain anonymous. Other LPC members will not be able to see your answers.</i>
        </p>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <p className="text-sm text-gray-500">
          This will only be to confirm that we have received responses from all LPC members. Your responses will not be tied to your name.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => setStep(1)} disabled={!name}>Next Page</Button>
      </CardFooter>
      {renderFooter()}
    </Card>
  );

  const renderProjectEvaluation = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Step 1: Project Evaluation</h1>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-bold mb-2">Project {currentProject + 1} of {projects.length}</p>
          <h2 className="text-xl font-bold mb-2">{projects[currentProject].title}</h2>
          <p className="text-sm font-semibold mb-2">Location: {projects[currentProject].location}</p>
          <p className="mb-4">{projects[currentProject].description}</p>
          <p className="font-semibold">NYF Request: ${projects[currentProject].nyfRequest.toLocaleString()}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Evaluation Criteria</h3>
          {criteria.map((criterion) => (
            <div key={criterion.name} className="mb-4">
              <label className="block mb-2">
                <span className="font-bold">{criterion.name}</span>
                <p className="text-sm text-gray-600">{criterion.description}</p>
              </label>
              <Select
                value={evaluations[currentProject][criterion.name] || ''}
                onValueChange={(value) => handleEvaluationChange(criterion.name, value)}
              >
                <option value="">Select...</option>
                {criterion.name === 'Alignment with State Goals' ? (
                  <>
                    <option value="High">High – Aligns with many State goals</option>
                    <option value="Medium">Medium – Aligns with a few state goals</option>
                    <option value="Low">Low – Does not align with State goals</option>
                  </>
                ) : (
                  <>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </>
                )}
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {currentProject > 0 ? (
            <Button onClick={() => setCurrentProject(currentProject - 1)}>Previous Project</Button>
          ) : (
            <Button onClick={() => setStep(0)}>Previous Page</Button>
          )}
        </div>
        <div>
          {currentProject < projects.length - 1 ? (
            <Button
              onClick={() => setCurrentProject(currentProject + 1)}
              disabled={Object.keys(evaluations[currentProject]).length !== criteria.length}
            >
              Next Project
            </Button>
          ) : (
            <Button
              onClick={() => setStep(2)}
              disabled={Object.keys(evaluations[currentProject]).length !== criteria.length}
            >
              Next Page
            </Button>
          )}
        </div>
      </CardFooter>
      {renderFooter()}
    </Card>
  );

  const renderProjectSelectionInstruction = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Step 2: Project Selection</h1>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <p className="mb-4">
          On the following page, you will select which projects you want to fund. You will see a box that shows "Your Rating" for each project, on a scale of High, Medium, Low. This rating is based on the evaluation you completed in Step 1. These ratings should help inform your decision-making about which projects to fund. As you select projects, a calculator will automatically sum the total NY Forward Request amount. You will only be able to submit your survey if the total NY Forward Request amount is between $6 million to $8 million.
        </p>
        <p className="mb-4">
          <i>Remember: This is only an exercise. Your selections in this exercise are not definitive. There will be on-going discussions at the upcoming LPC meetings to narrow down the list of projects.</i>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setStep(1)}>Previous Page</Button>
        <Button onClick={() => setStep(3)}>Next Page</Button>
      </CardFooter>
      {renderFooter()}
    </Card>
  );

  const renderProjectSelection = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Step 2: Project Selection</h1>
      </CardHeader>
      <CardContent>
        {projects.sort((a, b) => projectScores[projects.indexOf(b)] - projectScores[projects.indexOf(a)]).map((project, index) => {
          const projectIndex = projects.indexOf(project);
          const score = projectScores[projectIndex];
          let rating;
          let ratingColor;
          if (score >= 13) {
            rating = 'High';
            ratingColor = 'bg-green-500';
          } else if (score >= 7) {
            rating = 'Medium';
            ratingColor = 'bg-yellow-500';
          } else {
            rating = 'Low';
            ratingColor = 'bg-red-500';
          }
          return (
            <div key={index} className="flex flex-col mb-4 p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold">{project.title}</h2>
                  <p className="text-sm">{project.description}</p>
                  <p className="mt-2">NYF Request: ${project.nyfRequest.toLocaleString()}</p>
                  <div className="mt-2">
                    <Checkbox
                      checked={selectedProjects.includes(projectIndex)}
                      onCheckedChange={() => handleProjectSelection(projectIndex)}
                    />
                    <span className="ml-2">Fund this Project</span>
                  </div>
                </div>
                <div className={`${ratingColor} text-white rounded px-2 py-1`}>
                  Your Rating: {rating}
                </div>
              </div>
            </div>
          );
        })}
        <div className={`mt-4 p-4 rounded ${totalNYFRequest >= 6000000 && totalNYFRequest <= 8000000 ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-bold">Total NY Forward Request: ${totalNYFRequest.toLocaleString()}</p>
          {(totalNYFRequest < 6000000 || totalNYFRequest > 8000000) && (
            <p className="text-red-500 mt-2">The Total NY Forward Request should be between $6,000,000 to $8,000,000.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setStep(2)}>Previous Page</Button>
        <Button
          onClick={() => {
            // Here you would typically submit the data to a backend
            alert('Survey submitted successfully!');
          }}
          disabled={totalNYFRequest < 6000000 || totalNYFRequest > 8000000}
        >
          Submit
        </Button>
      </CardFooter>
      {renderFooter()}
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto">
        {step === 0 && renderIntroduction()}
        {step === 1 && renderProjectEvaluation()}
        {step === 2 && renderProjectSelectionInstruction()}
        {step === 3 && renderProjectSelection()}
      </div>
    </div>
  );
};

export default ProjectEvaluationApp;

