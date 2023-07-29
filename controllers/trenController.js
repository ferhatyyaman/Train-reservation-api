const canReserveInVagon = (vagon, kisiSayisi) => {
    const dolulukOrani = (vagon.DoluKoltukAdet / vagon.Kapasite) * 100;
    if (dolulukOrani <= 70 && vagon.Kapasite >= kisiSayisi) {
      return true;
    }
    return false;
  };
  
  const makeReservationInVagon = (vagon, kisiSayisi) => {
    vagon.DoluKoltukAdet += kisiSayisi;
    return { VagonAdi: vagon.Ad, KisiSayisi: kisiSayisi };
  };
  
  exports.rezervasyonYap = (req, res) => {
    const { Tren, RezervasyonYapilacakKisiSayisi, KisilerFarkliVagonlaraYerlestirilebilir } = req.body;
    const vagonlar = Tren.Vagonlar;
  
    const response = {
      RezervasyonYapilabilir: false,
      YerlesimAyrinti: [],
    };
  
    let kalanKisiSayisi = RezervasyonYapilacakKisiSayisi;
    for (const vagon of vagonlar) {
      if (kalanKisiSayisi === 0) break;
  
      if (KisilerFarkliVagonlaraYerlestirilebilir) {
        if (canReserveInVagon(vagon, 1)) {
          response.YerlesimAyrinti.push(makeReservationInVagon(vagon, 1));
          kalanKisiSayisi--;
        }
      } else {
        const kisiSayisi = Math.min(kalanKisiSayisi, vagon.Kapasite - vagon.DoluKoltukAdet);
        if (canReserveInVagon(vagon, kisiSayisi)) {
          response.YerlesimAyrinti.push(makeReservationInVagon(vagon, kisiSayisi));
          kalanKisiSayisi -= kisiSayisi;
        }
      }
    }
  
    if (kalanKisiSayisi === 0) {
      response.RezervasyonYapilabilir = true;
    }
  
    res.json(response);
  };
  