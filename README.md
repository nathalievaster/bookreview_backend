# Boktok – Backend

REST API för Boktok, byggd med Node.js och Express. Hanterar användare, recensioner och läslistor med autentisering via JWT.

## Tekniker

- **Node.js & Express** – server och routing
- **MongoDB & Mongoose** – databas och modeller
- **JWT** – autentisering med tokenhantering
- **bcrypt** – lösenordskryptering
- **dotenv** – hantering av miljövariabler
- **yup** - 

## Endpoints

| Metod | Route | Beskrivning | Skyddad |
|---|---|---|---|
| POST | `/api/auth/register` | Registrera användare | Nej |
| POST | `/api/auth/login` | Logga in | Nej |
| GET | `/api/auth/validate` | Validera token | Ja |
| GET | `/api/reviews` | Hämta alla recensioner | Ja (admin) |
| GET | `/api/reviews/myreviews` | Hämta egna recensioner | Ja |
| GET | `/api/reviews/:bookId` | Hämta recensioner för en bok | Nej |
| POST | `/api/reviews` | Skapa recension | Ja |
| PUT | `/api/reviews/:id` | Uppdatera recension | Ja |
| DELETE | `/api/reviews/:id` | Radera recension | Ja |
| GET | `/api/readinglist` | Hämta läslista | Ja |
| POST | `/api/readinglist` | Lägg till bok | Ja |
| PUT | `/api/readinglist/:id` | Uppdatera lässtatus | Ja |
| DELETE | `/api/readinglist/:id` | Ta bort bok | Ja |

## Installation

1. Klona repot:
```bash
git clone https://github.com/nathalievaster/bookreview_backend.git
```

2. Installera beroenden:
```bash
npm install
```

3. Skapa en `.env`-fil i rotkatalogen:
```
MONGO_URI=din_mongodb_uri_här
JWT_SECRET=din_hemliga_nyckel_här
```

4. Starta servern:
```bash
npm run dev
```

## Miljövariabler

| Variabel | Beskrivning |
|---|---|
| `MONGO_URI` | Anslutningssträng till MongoDB |
| `JWT_SECRET` | Hemlig nyckel för JWT-signering |

## Relaterade repon

- Frontend: [bookreview-frontend](https://github.com/nathalievaster/bookreview-frontend.git)
