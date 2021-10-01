import { useState } from "react"


export default () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: "Kane",
      age: 32,
      address: "UK"
    },
    {
      id: 2,
      name: "Jose",
      age: 42,
      address: "UK"
    }
  ])

  const create = (item) => {
    const temp = list.slice(0)
    temp.push({ ...item, id: list.length + 1 })
    updateList(temp)
  }

  const getById = (id) => {
    return list.find(listItem => listItem.id == id)
  }

  const updateById = (id, item) => {
    const temp = list.slice(0)
    const idx = temp.findIndex(listItem => listItem.id == id)
    if (idx !== -1) {
      temp.splice(idx, 1, { ...item, id })
      updateList(temp)
    }
  }

  const removeById = (id) => {
    const temp = list.filter(listItem => listItem.id != id)
    updateList(temp)
  }

  const updateList = (list) => {
    setList(list)
  }


  return { list, getById, create, updateById, updateList, removeById }
}
