package com.turksat.musteritakip.repository;

import com.turksat.musteritakip.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
