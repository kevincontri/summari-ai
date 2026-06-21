import { Input } from "../components/ui/input";
import NotesGrid from "../components/NotesGrid";

export default function Dashboard() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  }

  const notes = [
    {
      id: 1,
      title: "Note 1",
      content: "Content of note 1",
      user_id: 1,
      created_at: "2023-01-01",
    },
    {
      id: 2,
      title: "Note 2",
      content: "Content of note 2",
      user_id: 1,
      created_at: "2023-01-02",
    },
    {
      id: 3,
      title: "Note 3",
      content: "Content of note 3",
      user_id: 1,
      created_at: "2023-01-03",
    },
    {
      id: 4,
      title: "Note 4",
      content: "Content of note 4",
      user_id: 1,
      created_at: "2023-01-04",
    },
  ]
  return (
    <>
      {/* TODO: ADD LOGOUT BUTTON */}
      <div className="dashboard-page">
        <div className="header">
          <div className="flex flex-row items-center space-x-2">
            <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
            <a href="/" className="logo-text">Summari</a>
          </div>
          <div className="input-container">
            <img src="./src/assets/search.png" alt="Search Icon" className="search-icon cursor-pointer" />
            <Input placeholder="Search your notes..." variant="dashboard" className="placeholder:text-gray-700 placeholder:text-md"/>
          </div>
        </div>
      
      <div className="ai-input-container">
        <form onSubmit={handleSubmit} className="flex flex-row items-center space-x-2 w-full">
          <div className="ai-icon-container">
            <img src="./src/assets/stars.png" alt="Stars Icon" title="Summari AI" className="ai-icon" />
          </div>

          <Input required placeholder="Ask Summari about your notes..." variant="ai" className="placeholder:text-gray-800 placeholder:text-md" />

          <div className="send-icon-container">
            <button type="submit" className="send-icon-button">
              <img src="./src/assets/send.png" alt="Send Icon" className="send-icon cursor-pointer" />
            </button>
          </div>
        </form>
      </div>
        <NotesGrid notes={notes} />
      </div>
    </>
  )
}