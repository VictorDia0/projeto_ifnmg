import { useState, useEffect } from 'react';
import axios from '../axiosConfig';


const ListMeals = () => {
    const [mealRequests, setMealRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMealRequests, setFilteredMealRequests] = useState([]);

    useEffect(() => {
        const fetchMealRequests = async () => {
            try {
                const response = await axios.get('/mealrequests/');
                setMealRequests(response.data);
                setFilteredMealRequests(response.data);
            } catch (error) {
                console.error('Failed to fetch meal requests', error);
            }
        };

        fetchMealRequests();
    }, []);

    useEffect(() => {
        setFilteredMealRequests(
            mealRequests.filter(request => request.user.cpf.includes(searchTerm))
        );
    }, [searchTerm, mealRequests]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="list-table">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Pesquisar por CPF do Aluno"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Cliente</th>
                        <th>CPF do Cliente</th>
                        <th>Telefone do Cliente</th>
                        <th>Função</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMealRequests.map((request) => (
                        <tr key={request.id} >
                            <td>{request.id}</td>
                            <td>{request.user.name}</td>
                            <td>{request.user.cpf}</td>
                            <td>{request.user.phone_number}</td>
                            <td>{request.user.role}</td>
                            <td >
                                <p className={request.status === 'confirmed' ? 'pending' : 'pending'}>
                                {request.status} </p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMeals;
