package com.turksat.musteritakip.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MusteriDto {

    private Long oid;

    private String tckn;

    private String adi;

    private String soyadi;

    private LocalDate kayitTarihi;

}
