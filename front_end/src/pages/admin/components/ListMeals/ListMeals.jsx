import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListMeals.css';

const ListMeals = () => {
    const [mealRequests, setMealRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMealRequests, setFilteredMealRequests] = useState([]);
    const [meals, setMeals] = useState([]); // Atualize para plural para indicar uma lista

    useEffect(() => {
        const fetchMealRequests = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/mealrequests/');
                setMealRequests(response.data);
                setFilteredMealRequests(response.data);
                console.log(response);

                const responseMeal = await axios.get('http://127.0.0.1:8000/api/meal/');
                setMeals(responseMeal.data); // Corrigido para armazenar a lista de refeições
                console.log(responseMeal)
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
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.user.name}</td>
                            <td>{request.user.cpf}</td>
                            <td>{request.user.phone_number}</td>
                            <td>{request.user.role}</td>
                            <td>
                                <p className={request.status === 'confirmed' ? 'confirmed' : 'pending'}>
                                    {request.status}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Lista de Refeições</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ingredientes</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal.id}>
                            <td>{meal.id}</td>
                            <td>{meal.name}</td>
                            <td>{meal.ingredients}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMeals;
