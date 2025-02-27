package com.turksat.musteritakip.controller;

import com.turksat.musteritakip.dto.MusteriDto;
import com.turksat.musteritakip.entity.Musteri;
import com.turksat.musteritakip.repository.MusteriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class MusteriController {

    @Autowired
    MusteriRepository musteriRepository;

    @PostMapping("/saveOrUpdateCustomer")
    public String addCustomer (@RequestBody MusteriDto dto) {
        Musteri musteri = new Musteri();
        if (dto.getOid() != null && !dto.getOid().equals("")) {
            musteri.setOid(Long.valueOf(dto.getOid()));
        }
        musteri.setTckn(dto.getTckn());
        musteri.setAdi(dto.getAdi());
        musteri.setSoyadi(dto.getSoyadi());
        musteri.setKayitTarihi(dto.getKayitTarihi());
        musteriRepository.save(musteri);
        return "Kayıt İşlemi Başarıyla Yapıldı!";
    }

    @DeleteMapping("/deleteCustomer/{oid}")
    public String deleteCustomer (@PathVariable Long oid) {
        musteriRepository.deleteById(oid);
        return "Silme İşlemi Başarıyla Yapıldı!";
    }


    @PostMapping("/deneme")
    public String deleteCustomer () {
        return "Geliyor";
    }

    @PostMapping("/findCustomer")
    public List<Musteri> findCustomer () {
        return musteriRepository.findAll();
    }

    @GetMapping("/findCustomerById/{oid}")
    public Musteri findCustomer (@PathVariable Long oid) {
        return musteriRepository.findById(oid).get();
    }

}
