// TODO 21: Import axios
import axios from "axios";
// TODO 22: Create axios instance
const api = axios.create({
    baseURL: "http://localhost:3000/counters"
})
// TODO 23: create loadCounters with api.get
export async function loadCounters() {
    const res = await api.get("/");
    return res.data;
}
// TODO 24: create addCounter with api.post
export async function addCounter(name: string) {
    const res = await api.post("/", { name });
    return res.data;
}
// TODO 25: create updateCounter with api.patch
export async function updateCounter(id: string, newValue: number) {
    const res = await api.patch(`/${id}`, { newValue });
    return res.data;
}
// TODO 26: create deleteCounter with api.delete
export async function deleteCounter(id: string) {
    await api.delete(`/${id}`);
}
