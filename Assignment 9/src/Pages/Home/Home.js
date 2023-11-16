import SearchBox from "../../Common/SearchBox";


function Home({user}){
    // const [searchTerm, setSearchTerm] = useState("");
    // const [location, setLocation] = useState("");

    // const handleSubmit = (event) => {
    //   event.preventDefault();
      
    // };

    return (
      <div>
        <SearchBox />
        <br />
        <p>
          <span>Post your resume</span> - It only takes a few seconds
        </p>
        <p>
          Here to hire ? <span>Match with candidates today</span>
        </p>
        <br />
        <br />

        <p>
          Indeed helps people get jobs:{" "}
          <span id="highlighter">Over 16 million stories shared</span>
        </p>
      </div>
    );
}

export default Home;