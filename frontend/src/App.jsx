import { getAllUsers } from "./utils/apiUser";

export default function App() {
  const { data } = getAllUsers();

  console.log(data);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <header className="App-header">Learn React</header>
    </div>
  );
}
