import SearchBox from "../../Common/SearchBox";
import JobCard from "../../Common/JobCard";
import { useState } from "react";
import { CardGroup, Spinner } from "react-bootstrap";
import { Col } from "react-bootstrap";

const fetchSearchResults = async (searchTerm, location) => {
  const allJobs = [
    { id: 1, title: "Software Developer", location: "Boston, MA", description : "Software Engineer designs, develops, and maintains software systems. Key skills include programming proficiency.", },
    { id: 2, title: "Data Analyst", location: "Los Angeles, CA", description : " Analyst collects, processes, and analyzes data to help organizations make informed decisions." },
    { id: 3, title: "Web Designer", location: "Miami, FL", description : "Web Designer creates visually appealing and user-friendly websites by combining artistic design with technical skills." },
    {id : 4, title: "Frontend Developer", location:"Worcester, MA", description: "Develop user-friendly web pages using modern frontend technologies."},
    {id : 5, title: "Security Analyst", location:"New York", description: "Security Engineer responsible for maintaining secured firewalls and identities."},
    {id : 6, title: "Cloud Engineer", location:"Brooklyn", description: "Cloud Operations Engineer maintains cloud infra of the enterprsie."},
  ];

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredJobs);
    }, 1500); // Simulating a 1.5-second delay for loader
  });
};


function Jobs(){

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchTerm, location) => {
        try {
            setLoading(true);
            const results = await fetchSearchResults(searchTerm, location);
            setSearchResults(results);
          } catch (error) {
            // Handle error, you can set an error state or show a message to the user
          } finally {
            setLoading(false);
          }
    };


    return (
      <div>
        <SearchBox onSearch={handleSearch} />
        <br />
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <CardGroup
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {searchResults.map((job) => (
              <Col key={job.id} md={4} className="mb-3">
                <JobCard
                  key={job.id}
                  title={job.title}
                  location={job.location}
                  description={job.description}
                />
              </Col>
            ))}
          </CardGroup>
        )}
      </div>
    );
}

// function JobResults({ jobs }) {
//     return (
//       <div>
//         {jobs.map((job) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     );
// }

export default Jobs;