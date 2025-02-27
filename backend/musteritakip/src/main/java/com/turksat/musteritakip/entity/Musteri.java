package com.turksat.musteritakip.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Musteri {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private Long oid;

    private String tckn;

    private String adi;

    private String soyadi;

    private LocalDate kayitTarihi;
}
