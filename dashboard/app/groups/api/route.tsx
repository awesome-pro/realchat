import axios from "axios";


export async function fetchAllGroups(): Promise<void> {
    try {
        const response = await axios.get('http://localhost:8000/groups')
        Promise.resolve(response.data)
    } catch (error) {
        Promise.reject(error)
    }
}

export async function fetchGroupById(groupId: string): Promise<void> {
    try {
        const response = await axios.get(`http://localhost:8000/groups/${groupId}`)
        Promise.resolve(response.data)
    } catch (error) {
        Promise.reject(error)
    }
}

export async function createGroup(groupName: string): Promise<void> {
    try {
        const response = await axios.post('http://localhost:8000/groups', 
            { name: groupName }
        )
        Promise.resolve(response.data)
    } catch (error) {
        Promise.reject(error)
    }
}

