<template>
  <div class="centeredTextWall">
    <h1>InvoiceLab</h1>
    <p>
      Az InvoiceLab egy számlákat és hasonló dokumentumokat generáló WEB applikáció, melynek fő célja a testreszabhatóság és a gyors végrehajtás. A felhasználó számára egy átlátható, könnyen használható és az első opcióként tekintendő alkalmazást szeretnék létrehozni, annak tekintetében, hogy ehhez hasonló, már létező, minőségi applikációk száma kicsi.
    </p>
    <p>
      Kőműves Dávid-Márk vagyok, Informatika III. éves hallgató, és ezt a projektet a szakdolgozatomként szeretném megvalósítani.
    </p>
    <p>
      Az applikáció, mint egy általános web alapú alkalmazás, két fő részből fog állni, ezekre úgy fogok vonatkozni, mint a “backend”, illetve a “frontend”.
    </p>
    <p>
      A backend szerepe, hogy hídat képezzen az adatbázis és a frontend között. Express.js (Node.js) alappal szeretném futtatni, úgy, hogy egy API szerepét játsza. Működő komponensekre szeretném felépíteni, hogy teljes mértékben kihasználhassam az újrahasznosítható osztályokat (mint a User, vagy más “template”-ek).
    </p>
    <p>
      A frontend szerepe, hogy a backendről lekért információt értelmes formátumban tálalja a felhasználónak és létrehozzon egy rugalmas, reaktív, gyors, átlátható és megbízható felületet a számlák kiállítására. A frontenden lesznek meghívva a backenden meghatározott HTTP lekérések és feltöltések, melyek egy “.env” fájlban lesznek tárolva a könnyen módosíthatóság érdekében. A platform Vue.js 3 segítségével fog működni, amely egy teljes, reaktív, javascript keretrendszer. Az elképzelés az, hogy amint regisztrált, a felhasználó el tudjon menteni később előhívott termék és kliens neveket, illetve az ezekhez tartozó információt és ezeket képes legyen behelyezni templatekbe, melyek automatán számolnak összeget, ÁFÁ-t beleértve, és lehetővé teszik, hogy saját, illetve kliensének adatait beüthessék, hogy létrejöjjön egy számla. A bejelentkező felülethez pedig tervben van a Google captcha szolgáltatás felhasználása.
    </p>
    <p>
      Az adatbázis formátuma még kérdéses, viszont tekintélyben van a MySQL és a MongoDB. A MySQL felülettel több a tapasztalatom, viszont a MongoDB gyorsabb és a felhasználó fogalmára orientált tárolást biztosítana (tekintve, hogy lehetséges tömböket tárolni, így a User táblában el lehetne menteni mindent, ami a felhasználó elmentett adataival kapcsolatos). A jelszavak “hash”-elés folyamat segítségével titkosítva lesznek.
    </p>
    <p>
      A projekt, nagy valószínűséggel, kisebb-nagyobb változásokon fog átesni a megvalósítása alatt, viszont a fő cél, hogy a végső termék a lehető legközelebb kerüljön az eddig leírt fogalmakhoz.
    </p>
  </div>
</template>

<script>
export default{
  name: "AboutPage"
}
</script>