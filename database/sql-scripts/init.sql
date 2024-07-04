--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: cart_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cart_status_enum AS ENUM (
    'En Progreso',
    'Completado'
);


ALTER TYPE public.cart_status_enum OWNER TO postgres;

--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'En Progreso',
    'Completado'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'Administrador',
    'Comprador',
    'Vendedor'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status public.cart_status_enum DEFAULT 'En Progreso'::public.cart_status_enum NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    color character varying NOT NULL,
    quantity integer NOT NULL,
    total_price double precision NOT NULL,
    product_id integer NOT NULL,
    cart_id integer,
    order_id integer
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- Name: cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_item_id_seq OWNER TO postgres;

--
-- Name: cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    image character varying NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    status public.order_status_enum DEFAULT 'En Progreso'::public.order_status_enum NOT NULL,
    cart_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    updated_at timestamp without time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method (
    id integer NOT NULL,
    card_name character varying NOT NULL,
    card_number character varying NOT NULL,
    expired_at character varying NOT NULL,
    cvc_number integer NOT NULL,
    user_id integer
);


ALTER TABLE public.payment_method OWNER TO postgres;

--
-- Name: payment_method_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_method_id_seq OWNER TO postgres;

--
-- Name: payment_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_method_id_seq OWNED BY public.payment_method.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    discount integer NOT NULL,
    image character varying NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    rate character varying NOT NULL,
    presentation_images text[],
    description text,
    colors text[],
    user_id integer,
    category_id integer,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    sold_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.report OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_id_seq OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_id_seq OWNED BY public.report.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id integer NOT NULL,
    rating double precision NOT NULL,
    comment text NOT NULL,
    image text NOT NULL,
    product_id integer,
    user_id integer
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_id_seq OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: shipping_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipping_address (
    id integer NOT NULL,
    name character varying NOT NULL,
    details character varying NOT NULL,
    "default" boolean NOT NULL,
    user_id integer
);


ALTER TABLE public.shipping_address OWNER TO postgres;

--
-- Name: shipping_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipping_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shipping_address_id_seq OWNER TO postgres;

--
-- Name: shipping_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipping_address_id_seq OWNED BY public.shipping_address.id;


--
-- Name: specials_offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specials_offers (
    id integer NOT NULL,
    percent_discount character varying NOT NULL,
    description character varying NOT NULL,
    image character varying NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.specials_offers OWNER TO postgres;

--
-- Name: specials_offers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specials_offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.specials_offers_id_seq OWNER TO postgres;

--
-- Name: specials_offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specials_offers_id_seq OWNED BY public.specials_offers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    email character varying(50),
    password character varying(255),
    created_at timestamp without time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    full_name character varying,
    gender character varying,
    phone character varying,
    photo character varying,
    updated_at timestamp without time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    role public.users_role_enum DEFAULT 'Comprador'::public.users_role_enum NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: payment_method id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method ALTER COLUMN id SET DEFAULT nextval('public.payment_method_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public.report_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: shipping_address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping_address ALTER COLUMN id SET DEFAULT nextval('public.shipping_address_id_seq'::regclass);


--
-- Name: specials_offers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specials_offers ALTER COLUMN id SET DEFAULT nextval('public.specials_offers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, user_id, status) FROM stdin;
1	19	Completado
4	19	Completado
5	19	Completado
6	19	Completado
7	19	Completado
8	19	Completado
9	19	Completado
10	19	Completado
11	19	Completado
12	19	Completado
13	21	En Progreso
15	19	Completado
17	19	En Progreso
18	22	Completado
19	22	Completado
20	22	Completado
22	22	Completado
\.


--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, color, quantity, total_price, product_id, cart_id, order_id) FROM stdin;
1	#FF018786	3	840	9	1	\N
2	#FF018786	3	840	9	4	\N
3	#FF018786	3	840	9	5	\N
4	#FF018786	1	280	9	6	\N
5	#FF018786	1	280	9	7	\N
6	#FF018786	1	280	9	8	\N
7	#FF018786	1	480	10	9	\N
8	#FF018786	1	280	9	10	\N
9	#FF018786	1	280	9	11	\N
10	#FF018786	1	480	10	11	\N
11	#FF018786	1	280	9	12	\N
12	#F08080	1	0	11	13	\N
14	#FF018786	2	0	11	13	\N
16	string	2	110	10	15	\N
19	string	4	110	20	18	\N
20	string	4	110	20	19	\N
21	string	4	110	20	20	\N
23	string	1	110	22	22	\N
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, image) FROM stdin;
1	Mujer	https://cdn-icons-png.flaticon.com/512/5529/5529133.png
2	Hombre	https://cdn-icons-png.flaticon.com/512/10416/10416145.png
3	Niño	https://cdn-icons-png.flaticon.com/512/5069/5069208.png
4	Niña	https://cdn-icons-png.flaticon.com/512/5529/5529133.png
5	Bebés	https://cdn-icons-png.flaticon.com/512/5529/5529133.png
6	Familia	https://cdn-icons-png.flaticon.com/512/12442/12442152.png
7	Otros	https://cdn-icons-png.flaticon.com/512/12442/12442142.png
8	Accesorios	https://cdn-icons-png.flaticon.com/128/10785/10785670.png
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, status, cart_id, user_id, created_at, updated_at) FROM stdin;
1	En Progreso	1	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
2	En Progreso	4	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
3	En Progreso	5	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
4	En Progreso	6	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
5	En Progreso	7	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
6	En Progreso	8	19	2024-06-15 16:57:49.378917	2024-06-15 16:57:49.378917
7	Completado	9	19	2024-06-15 16:57:49.378917	2024-06-15 19:53:04.848489
8	En Progreso	10	19	2024-06-15 19:56:37.070624	2024-06-15 19:56:37.070624
9	En Progreso	11	19	2024-06-15 19:58:01.974557	2024-06-15 19:58:01.974557
10	En Progreso	12	19	2024-06-15 20:03:43.891	2024-06-15 20:03:43.891
11	En Progreso	15	19	2024-06-26 00:20:57.785	2024-06-26 00:20:57.785
12	En Progreso	18	22	2024-06-26 01:07:32.308176	2024-06-26 01:07:32.308176
13	En Progreso	19	22	2024-06-26 01:11:28.122646	2024-06-26 01:11:28.122646
14	En Progreso	20	22	2024-06-26 01:12:32.38202	2024-06-26 01:12:32.38202
15	En Progreso	22	22	2024-06-26 22:56:18.018112	2024-06-26 22:56:18.018112
\.


--
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method (id, card_name, card_number, expired_at, cvc_number, user_id) FROM stdin;
2	Jackson Montengro	1222 2323 4554 4543	12/27	123	19
3	Jose Montengro	1222 2323 4554 4543	12/27	123	19
4	Rocky Montengro	1222 2323 4554 4543	12/27	123	19
5	Rocky Montengro	1222 2323 4554 4543	12/27	123	19
6	ewrwerwr	3424 2342 4234 3242	34/24	234	19
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, discount, image, name, price, rate, presentation_images, description, colors, user_id, category_id, quantity) FROM stdin;
22	0	string	string	0	string	{string}	string	{string}	19	4	9
23	0	string	string	0	string	{string}	string	{string}	22	3	10
21	0	string	string	0	string	{string}	string	{string}	19	4	10
18	0	string	string	0	string	{string}	string	{string}	19	\N	10
11	10	string	string	0	string	{https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2Fvestido-casual-celeste.jpg?alt=media&token=562ea07f-ed77-47ea-a3cd-46a2cf99120e,https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2Fvestido-casual-celeste.jpg?alt=media&token=562ea07f-ed77-47ea-a3cd-46a2cf99120e}	string	{#CD5C5C,#FFA07A,#F08080}	\N	\N	10
9	10	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2Fvestido-casual-celeste.jpg?alt=media&token=562ea07f-ed77-47ea-a3cd-46a2cf99120e	Vestido Casual Celeste	280	4.4	{https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2Fvestido-casual-celeste.jpg?alt=media&token=562ea07f-ed77-47ea-a3cd-46a2cf99120e,https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2Fvestido-casual-celeste.jpg?alt=media&token=562ea07f-ed77-47ea-a3cd-46a2cf99120e}	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	\N	\N	\N	10
20	0	string	string	0	string	{string}	string	{string}	19	4	7
10	20	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942	Camiseta Guess Azul	480	4.8	{https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942,https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942,https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942}	Lorem Ipsum is simply dummy text of the printing and typesetting industry.	\N	\N	\N	8
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report (id, user_id, product_id, quantity, sold_at) FROM stdin;
2	19	20	4	2024-06-26 01:11:28.105539
3	19	20	4	2024-06-26 01:12:32.371959
4	19	22	1	2024-06-26 22:56:17.997251
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, rating, comment, image, product_id, user_id) FROM stdin;
1	4.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
2	4.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
3	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
4	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
5	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
6	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
7	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
8	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
9	2.4	Lorem ipsum daime intur adme no toru	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	9	19
10	1.2	Anada sfsdf afefdsf	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718502949752.jpg?alt=media&token=676c724e-6ee0-446c-85b4-67323d027c1a	10	19
16	5	string	string	10	19
11	5	string	string	10	19
12	5	Esta feo	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/review%2F1718689821249.jpg?alt=media&token=6d09c836-9b1c-4c68-91f7-29c9d0d3ce9d	10	19
13	5	string	string	10	19
14	5	string	string	10	19
15	5	string	string	10	19
17	5	string	string	10	19
18	5	string	string	10	19
19	5	string	string	10	19
20	5	string	string	10	19
21	5	string	string	10	19
22	5	string	string	10	19
23	5	string	string	10	19
24	5	string	string	10	19
25	5	string	string	10	19
26	5	string	string	10	19
27	5	string	string	10	19
28	5	string	string	10	19
29	5	string	string	10	19
30	5	string	string	10	19
\.


--
-- Data for Name: shipping_address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipping_address (id, name, details, "default", user_id) FROM stdin;
4	Work	61480 Colorado Center, QK 5679	f	19
5	Hobby - 1	61480 Prince Park, PC 5679	f	19
6	Home	61480 Sunbrook Park, PC 5679	f	19
8	Postal Office	32000, Inmortal Jone St	f	19
9	Good Vibes	423434, Terminator, T6333	f	19
7	Office Service	21000, 2nd Street, Leon	f	19
10	Store bags	23423, SkyNet - St	t	19
\.


--
-- Data for Name: specials_offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specials_offers (id, percent_discount, description, image, title) FROM stdin;
1	70%	Is a Special Offer	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942	Black Friday
2	70%	Is a Special Offer	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942	Black Friday
3	720%	Is a Special Offer	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/products-images%2FM2GP24K7HD0.jpg?alt=media&token=87c935c4-2818-452c-806d-c42494d5b942	Black Friday
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, created_at, full_name, gender, phone, photo, updated_at, role) FROM stdin;
19	Mjackson22	jm@gmail.com	$2b$10$KScbPSTFlUghrNnqoDeQpeEsRkjOgcIeqH2diglHYG8SaREx4ldDO	2024-06-09 01:09:36.772653	Jackson Montenegro	Hombre	+15551234567		2024-06-09 01:10:46.201103	Comprador
20	\N	string@gmail.com	$2b$10$RJCXZ32wN4iAAnvfoLTswOW0iGmWsm1yPxATtlvnVmu0OOdXT1dHS	2024-06-10 02:02:18.235599	\N	\N	\N	\N	2024-06-10 02:02:18.235599	Comprador
21	Test 12	test1@gmail.com	$2b$10$O1/P3buTT.UsX4TnBfpKhOr1f2tdSsXOIwg.v9u.rsBIGbtnjm.ly	2024-06-20 00:39:35.190455	Test 1	Hombre	+15551234567	https://firebasestorage.googleapis.com/v0/b/sheystore-d7393.appspot.com/o/user-photos%2F1718865603158.jpg?alt=media&token=31224355-f035-48cf-a1b5-cbcc0a373263	2024-06-20 00:40:30.693416	Comprador
22	Seller 1	test2@gmail.com	$2b$10$KupSt3Z/fE6cufQhmIxeeuCx57BlifXWZ2d8yVsp5ZHn//g2R/TLe	2024-06-22 11:00:52.768071	Seller	Hombre	+15551234567		2024-06-22 11:01:18.261736	Vendedor
\.


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 22, true);


--
-- Name: cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_item_id_seq', 23, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 8, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 15, true);


--
-- Name: payment_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_method_id_seq', 6, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 23, true);


--
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_seq', 4, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_seq', 30, true);


--
-- Name: shipping_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shipping_address_id_seq', 10, true);


--
-- Name: specials_offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specials_offers_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 22, true);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- Name: payment_method PK_7744c2b2dd932c9cf42f2b9bc3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY (id);


--
-- Name: report PK_99e4d0bea58cba73c57f935a546; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: cart_item PK_bd94725aa84f8cf37632bcde997; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: cart PK_c524ec48751b9b5bcfbf6e59be7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY (id);


--
-- Name: specials_offers PK_cc1ce9d5590fd81897b921e97a1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specials_offers
    ADD CONSTRAINT "PK_cc1ce9d5590fd81897b921e97a1" PRIMARY KEY (id);


--
-- Name: shipping_address PK_facb0fff23b713c9e09b2da88f6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping_address
    ADD CONSTRAINT "PK_facb0fff23b713c9e09b2da88f6" PRIMARY KEY (id);


--
-- Name: order REL_c99a206eb11ad45f6b7f04f2dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "REL_c99a206eb11ad45f6b7f04f2dc" UNIQUE (cart_id);


--
-- Name: product FK_0dce9bc93c2d2c399982d04bef1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order FK_199e32a02ddc0f47cd93181d8fd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review FK_26b533e15b5f2334c96339a1f08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product FK_3e59a34134d840e83c2010fac9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_item FK_67a2e8406e01ffa24ff9026944e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "FK_67a2e8406e01ffa24ff9026944e" FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shipping_address FK_74b2fbb738d4c71d801a8b974a0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping_address
    ADD CONSTRAINT "FK_74b2fbb738d4c71d801a8b974a0" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review FK_81446f2ee100305f42645d4d6c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_item FK_b6b2a4f1f533d89d218e70db941; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_method FK_b9f0b59dc5fd5150f2df494a480; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT "FK_b9f0b59dc5fd5150f2df494a480" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: report FK_c6686efa4cd49fa9a429f01bac8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order FK_c99a206eb11ad45f6b7f04f2dcc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_c99a206eb11ad45f6b7f04f2dcc" FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_item FK_d5ec615b4574022694ce1093e4e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "FK_d5ec615b4574022694ce1093e4e" FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart FK_f091e86a234693a49084b4c2c86; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

