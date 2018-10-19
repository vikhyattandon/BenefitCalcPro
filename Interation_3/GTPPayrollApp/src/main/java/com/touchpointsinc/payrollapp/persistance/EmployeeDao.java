package com.touchpointsinc.payrollapp.persistance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Long> {
	/**
     * Finds employees by using firstName and lastName as a search criteria.
     * @param firstName
     * @param lastName
     * @return  A list of employees whose firstName or lastName is like the given firstName and lastName.
     *          If no record is found, this method returns an empty list.
     */
    @Query("SELECT e FROM Employee e WHERE e.firstName LIKE :firstName AND e.lastName LIKE :lastName order by lastName DESC")
    public List<Employee> findByName(@Param("firstName")String firstName, @Param("lastName")String lastName);
    
    /**
     * Get employees by login.
     * @param login
     * @return  employees
     */
    @Query("SELECT e FROM Employee e WHERE e.login = :login")
    public Employee getOneByLogin(@Param("login")String login);
    
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public <S extends Employee> S save(S entity);
}