import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";

import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import './styles/global.scss'

export function App() {
  return (
    <>
        <Header />
        <TaskList />
    </>
  )
}