--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id text NOT NULL,
    amount integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    order_id text NOT NULL,
    product_id text NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id text NOT NULL,
    "table" integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    draft boolean DEFAULT true NOT NULL,
    name text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id text NOT NULL,
    name text NOT NULL,
    price text NOT NULL,
    description text NOT NULL,
    banner text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    category_id text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f7b09221-396b-472f-b398-b41473b60525	cb9e200be676db6676c9dc3fc8d1ad12835af24fa4a2899e46f90661c6cf884a	2025-05-13 14:36:16.613327-03	20250513173616_create_table_users	\N	\N	2025-05-13 14:36:16.603337-03	1
56bc0d2f-ecfc-4627-b197-cb4eb8dfe1c5	1a911e8f8be0cd2a5c69dc98790abd869fa63e278a7f6f00c61e1c80dd1f6b7d	2025-05-13 15:15:49.301315-03	20250513181548_create_models_pizzaria	\N	\N	2025-05-13 15:15:49.274369-03	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, created_at, update_at) FROM stdin;
f829d2c5-44c7-4872-b9d7-7f01de54aeeb	bebidas	2025-05-19 14:40:51.727	2025-05-19 14:40:51.727
68f2cadd-518d-40a9-acf6-20a4150a12e9	pizzas	2025-05-19 14:41:17.578	2025-05-19 14:41:17.578
53984a61-81b8-40cb-9d0f-ca85a985a353	sobremesas	2025-05-19 16:41:40.199	2025-05-19 16:41:40.199
eec88ec9-e2f3-4510-9b59-04b69f764ff5	Sorvete	2025-05-26 12:15:29.261	2025-05-26 12:15:29.261
8cdfe41e-7046-4bbd-b846-6f2f21644aed	espeto	2025-05-26 12:15:59.296	2025-05-26 12:15:59.296
d71a3e6b-ec96-4f23-85d4-1f81a8955fb4	hamburguer	2025-05-26 12:16:12.081	2025-05-26 12:16:12.081
c0b5f284-3896-4fd7-935e-4f3585cfd3c3	acompanhamentos	2025-05-26 12:17:02.003	2025-05-26 12:17:02.003
0279ce85-0d09-4e9a-beb4-cb26e2a3dc11	esfihas	2025-05-26 14:11:09.881	2025-05-26 14:11:09.881
3a17569b-64f4-4eb6-9c2f-99f25181dccd	lanches	2025-06-23 19:45:34.754	2025-06-23 19:45:34.754
885b2c36-53e0-4f18-9cab-0ae9861fadbe	vinhos	2025-06-23 19:51:14.796	2025-06-23 19:51:14.796
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, amount, created_at, update_at, order_id, product_id) FROM stdin;
3e760812-4a9a-4b41-a2f1-33d865f1da36	2	2025-06-16 14:31:26.154	2025-06-16 14:31:26.154	b55d0a0c-fa26-4f4f-be5a-329a07d77eed	4614895b-a7f4-4d09-980c-39517896e43b
956fcc5a-483d-48a8-b0e4-2e7f6b11e177	1	2025-06-16 14:31:43.265	2025-06-16 14:31:43.265	b55d0a0c-fa26-4f4f-be5a-329a07d77eed	baf80543-15a5-43ec-9702-608d5ceee0d2
d4c1ecf3-ae7f-4607-9c52-ecb7feb488c5	1	2025-06-17 17:32:23.008	2025-06-17 17:32:23.008	d2b6bbd6-ad23-4e80-834c-9a06b30697fc	1f44c63f-3acc-424c-a459-70ef8bb7befa
2171acd4-abc7-42c2-8600-089c6295e1d5	1	2025-06-17 17:32:42.85	2025-06-17 17:32:42.85	d2b6bbd6-ad23-4e80-834c-9a06b30697fc	c9748d25-6a2f-40a3-ae0a-df342e43592b
288f1d24-4777-415e-b406-3e90dac76b91	1	2025-06-17 17:33:32.924	2025-06-17 17:33:32.924	d2b6bbd6-ad23-4e80-834c-9a06b30697fc	c9748d25-6a2f-40a3-ae0a-df342e43592b
8e449c35-c5cf-4560-b471-c90ccbe6ec7a	1	2025-06-17 17:33:55.619	2025-06-17 17:33:55.619	255b1702-ee71-417e-a691-747d0ef8e507	c9748d25-6a2f-40a3-ae0a-df342e43592b
b59a70e7-7e98-4c98-b65b-3d47665c95fb	2	2025-06-17 17:34:14.574	2025-06-17 17:34:14.574	255b1702-ee71-417e-a691-747d0ef8e507	1f44c63f-3acc-424c-a459-70ef8bb7befa
8473889c-88ac-40cd-be3a-e73315f299bc	1	2025-06-17 17:38:35.594	2025-06-17 17:38:35.594	6e351cc0-0be2-41fa-b7db-72aa65ff300d	c9748d25-6a2f-40a3-ae0a-df342e43592b
9da40553-b74a-4bdf-9b32-a8d406ed4c62	1	2025-06-17 17:43:22.57	2025-06-17 17:43:22.57	fcb782dd-93dd-49de-8679-79b44de20913	293cbab0-1351-4c5c-b8f1-7f1b9d57fd22
3547fef8-45d7-44e8-b765-57a8ceff725f	1	2025-06-17 17:43:27.502	2025-06-17 17:43:27.502	fcb782dd-93dd-49de-8679-79b44de20913	c9748d25-6a2f-40a3-ae0a-df342e43592b
6145ef1c-b9ba-4978-abf9-63a10ca4492e	1	2025-06-17 17:45:37.405	2025-06-17 17:45:37.405	fcb782dd-93dd-49de-8679-79b44de20913	4614895b-a7f4-4d09-980c-39517896e43b
5de4ec78-3c49-4b22-9fdd-8d9ce04a2321	3	2025-06-17 17:47:52.938	2025-06-17 17:47:52.938	b1b00259-a852-41b5-a495-4bcf8ccad17f	c9748d25-6a2f-40a3-ae0a-df342e43592b
c2906f6a-a40d-4654-a371-f3af3bcd490d	1	2025-06-17 17:49:16.706	2025-06-17 17:49:16.706	a47decad-473f-4719-bbbb-9b8b21be905a	c9748d25-6a2f-40a3-ae0a-df342e43592b
2e1439f4-23c4-4cc4-8bdf-ead57f0a5b1b	1	2025-06-17 17:54:33.127	2025-06-17 17:54:33.127	65720036-b68a-4d1f-bd9f-9d2add806818	c9748d25-6a2f-40a3-ae0a-df342e43592b
5b798846-2417-4a87-85a0-38926e0aeff9	1	2025-06-17 17:56:45.95	2025-06-17 17:56:45.95	65720036-b68a-4d1f-bd9f-9d2add806818	1f44c63f-3acc-424c-a459-70ef8bb7befa
52423935-9d53-4f23-8d35-477d8168c29e	1	2025-06-17 18:11:55.156	2025-06-17 18:11:55.156	edd00dfa-04cb-4b3e-89fd-6bc3d792e9dd	c9748d25-6a2f-40a3-ae0a-df342e43592b
432e3701-0493-4cf8-ac65-8476a7aa366e	1	2025-06-17 18:58:46.899	2025-06-17 18:58:46.899	fd98dd9e-521b-43c9-a0b4-e219bba256f7	c9748d25-6a2f-40a3-ae0a-df342e43592b
b264cd00-73c3-4dc2-bc83-ba2413fbf71b	3	2025-06-17 19:08:39.98	2025-06-17 19:08:39.98	774301be-ac77-4bd8-b307-3c4d20818640	cc5424b7-6aad-40a4-be19-84d28f26efd8
9c89e5fb-cab7-46c3-b83b-e8ed3cfbd69e	1	2025-06-17 19:09:49.84	2025-06-17 19:09:49.84	ba398471-07cf-4725-be9e-763d8f0ac38a	c9748d25-6a2f-40a3-ae0a-df342e43592b
6991d538-17fc-4d40-8e19-e1e063d167a0	1	2025-06-17 19:10:47.19	2025-06-17 19:10:47.19	a0502062-d3b9-4a22-868a-35dd7ec3004c	c9748d25-6a2f-40a3-ae0a-df342e43592b
38a163d8-47a0-45fc-bcfb-bea6a7160e54	1	2025-06-17 19:11:41.989	2025-06-17 19:11:41.989	4064997c-ff50-4a0f-83bc-5591b9bb7126	c9748d25-6a2f-40a3-ae0a-df342e43592b
ba988313-d0f9-43aa-896b-e00982b859dd	3	2025-06-17 19:11:48.609	2025-06-17 19:11:48.609	4064997c-ff50-4a0f-83bc-5591b9bb7126	cc5424b7-6aad-40a4-be19-84d28f26efd8
698a7dc7-a081-42b6-b25d-497a7fe969d1	1	2025-06-17 19:12:00.873	2025-06-17 19:12:00.873	b68251a2-e7a0-40f2-a4f9-d609703fde87	baf80543-15a5-43ec-9702-608d5ceee0d2
abb9e451-200f-49ad-a6aa-48761fe142ce	1	2025-06-17 19:12:01.04	2025-06-17 19:12:01.04	b68251a2-e7a0-40f2-a4f9-d609703fde87	baf80543-15a5-43ec-9702-608d5ceee0d2
d46061f1-753d-47d1-a7c5-cc8c4d1220d7	1	2025-06-17 19:12:19.51	2025-06-17 19:12:19.51	e3b676b6-5dae-4517-8479-d5eebf0a2fbb	baf80543-15a5-43ec-9702-608d5ceee0d2
85429b87-be74-4b29-be6e-8dd2c14f6752	1	2025-06-17 19:12:19.677	2025-06-17 19:12:19.677	e3b676b6-5dae-4517-8479-d5eebf0a2fbb	baf80543-15a5-43ec-9702-608d5ceee0d2
8b7da820-5606-43ef-afbd-b8973c6371fa	1	2025-06-23 11:35:29.025	2025-06-23 11:35:29.025	da024142-bf76-4f80-96e8-364e7018deda	cc5424b7-6aad-40a4-be19-84d28f26efd8
ad3ce799-b2a8-4d5a-a813-3438f9860dfd	2	2025-06-23 11:35:42.71	2025-06-23 11:35:42.71	da024142-bf76-4f80-96e8-364e7018deda	293cbab0-1351-4c5c-b8f1-7f1b9d57fd22
c3bc7ac0-0309-4f86-b18c-88253552d586	1	2025-06-23 19:21:36.717	2025-06-23 19:21:36.717	adbb82d4-a56c-403c-b40d-a7be4b27617d	baf80543-15a5-43ec-9702-608d5ceee0d2
caf2dec5-89e0-4113-9b2e-2f5036fff7ad	2	2025-06-23 19:48:12.924	2025-06-23 19:48:12.924	2d99f7ca-3b8c-4077-b2b1-979e880cfdb4	6c389bc6-73b3-4a82-96c3-5c9d8a566974
d07d53bd-738c-4afe-b348-7ccf0195ae0a	2	2025-06-23 19:54:40.466	2025-06-23 19:54:40.466	d94fe71c-bbad-4bb9-8efe-97a8e3b2b661	1f44c63f-3acc-424c-a459-70ef8bb7befa
655666b6-fe4c-4f19-9490-b1f9e7d13a3b	4	2025-06-23 19:54:51.94	2025-06-23 19:54:51.94	d94fe71c-bbad-4bb9-8efe-97a8e3b2b661	837fb824-999e-4b32-9836-a7e95c6d1277
3146df5f-1ea9-4c5e-8297-80a0f90494db	1	2025-06-23 19:55:04.329	2025-06-23 19:55:04.329	d94fe71c-bbad-4bb9-8efe-97a8e3b2b661	cc5424b7-6aad-40a4-be19-84d28f26efd8
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "table", status, draft, name, created_at, update_at) FROM stdin;
b1b00259-a852-41b5-a495-4bcf8ccad17f	6	f	t	\N	2025-06-17 17:47:40.364	2025-06-17 17:47:40.364
a47decad-473f-4719-bbbb-9b8b21be905a	7	f	t	\N	2025-06-17 17:49:07.553	2025-06-17 17:49:07.553
65720036-b68a-4d1f-bd9f-9d2add806818	4	f	t	\N	2025-06-17 17:54:26.721	2025-06-17 17:54:26.721
edd00dfa-04cb-4b3e-89fd-6bc3d792e9dd	29	f	t	\N	2025-06-17 18:11:42.155	2025-06-17 18:11:42.155
fd98dd9e-521b-43c9-a0b4-e219bba256f7	33	f	t	\N	2025-06-17 18:58:39.588	2025-06-17 18:58:39.588
774301be-ac77-4bd8-b307-3c4d20818640	93	f	t	\N	2025-06-17 19:08:19.978	2025-06-17 19:08:19.978
ba398471-07cf-4725-be9e-763d8f0ac38a	93	t	f	\N	2025-06-17 19:09:46.039	2025-06-17 19:09:46.039
a0502062-d3b9-4a22-868a-35dd7ec3004c	93	t	f	\N	2025-06-17 19:10:44.111	2025-06-17 19:10:44.111
4064997c-ff50-4a0f-83bc-5591b9bb7126	3	f	f	\N	2025-06-17 19:11:38.671	2025-06-17 19:11:38.671
b68251a2-e7a0-40f2-a4f9-d609703fde87	6	f	f	\N	2025-06-17 19:11:59.871	2025-06-17 19:11:59.871
e3b676b6-5dae-4517-8479-d5eebf0a2fbb	80	f	f	\N	2025-06-17 19:12:17.742	2025-06-17 19:12:17.742
da024142-bf76-4f80-96e8-364e7018deda	72	t	f	\N	2025-06-23 11:35:17.695	2025-06-23 11:35:17.695
b55d0a0c-fa26-4f4f-be5a-329a07d77eed	90	f	f	Norma	2025-06-16 14:30:29.083	2025-06-16 14:30:29.083
ce619bea-e51c-4679-a736-8df5db60c83e	60	f	t	\N	2025-06-17 12:39:37.153	2025-06-17 12:39:37.153
2d99f7ca-3b8c-4077-b2b1-979e880cfdb4	102	t	f	\N	2025-06-23 19:47:45.1	2025-06-23 19:47:45.1
616fde52-9d9c-427d-b364-28098c01773f	37	f	t	\N	2025-06-17 13:46:12.709	2025-06-17 13:46:12.709
d94fe71c-bbad-4bb9-8efe-97a8e3b2b661	103	t	f	\N	2025-06-23 19:54:22.957	2025-06-23 19:54:22.957
adbb82d4-a56c-403c-b40d-a7be4b27617d	100	t	f	\N	2025-06-23 19:20:40.489	2025-06-23 19:20:40.489
f81e4f2f-f1cb-4f5a-a6be-632eb67f4bff	19	f	t	\N	2025-06-17 13:58:47.842	2025-06-17 13:58:47.842
162134b6-3a27-4328-b016-42efe4da1058	11	f	t	\N	2025-06-17 14:29:26.201	2025-06-17 14:29:26.201
50c4e92a-ff72-4c64-bec1-a44431ca2994	67	f	t	\N	2025-06-17 16:30:08.101	2025-06-17 16:30:08.101
25df91dc-8677-4d53-84a6-dab41d01968c	67	f	t	\N	2025-06-17 16:39:28.7	2025-06-17 16:39:28.7
6818f387-88fe-4eeb-af79-f252dbdc920a	67	f	t	\N	2025-06-17 16:41:07.547	2025-06-17 16:41:07.547
9343c31c-b63c-49a1-b252-ffdf2285bba7	14	f	t	\N	2025-06-17 17:09:07.917	2025-06-17 17:09:07.917
ba8dbc4e-cdff-4138-9178-82564488691f	12	f	t	\N	2025-06-17 17:23:29.063	2025-06-17 17:23:29.063
d2b6bbd6-ad23-4e80-834c-9a06b30697fc	41	f	t	\N	2025-06-17 17:27:02.78	2025-06-17 17:27:02.78
255b1702-ee71-417e-a691-747d0ef8e507	94	f	t	\N	2025-06-17 17:33:52.182	2025-06-17 17:33:52.182
6e351cc0-0be2-41fa-b7db-72aa65ff300d	15	f	t	\N	2025-06-17 17:38:27.254	2025-06-17 17:38:27.254
fcb782dd-93dd-49de-8679-79b44de20913	15	f	t	\N	2025-06-17 17:43:16.031	2025-06-17 17:43:16.031
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, description, banner, created_at, update_at, category_id) FROM stdin;
4614895b-a7f4-4d09-980c-39517896e43b	Pizza calabresa 2	60	pizza mt top e boa	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750082345/fow45r3zy0n2ahurr0fp.jpg	2025-06-16 14:00:05.306	2025-06-16 14:00:05.306	68f2cadd-518d-40a9-acf6-20a4150a12e9
1f44c63f-3acc-424c-a459-70ef8bb7befa	pizza strogonoff	75	pizza deliciosa de strogonoff	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750179383/zuw7h1iyhydrd8k1k3s5.jpg	2025-06-17 16:56:25.45	2025-06-17 16:56:25.45	68f2cadd-518d-40a9-acf6-20a4150a12e9
c9748d25-6a2f-40a3-ae0a-df342e43592b	suco laranja 300ml	15	mt top o suco de laranja	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750179618/wbxce5bpz9dvl7pbo0hj.jpg	2025-06-17 17:00:20.981	2025-06-17 17:00:20.981	f829d2c5-44c7-4872-b9d7-7f01de54aeeb
293cbab0-1351-4c5c-b8f1-7f1b9d57fd22	espetinho	20	Espetinho mt bom de carne	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750182105/kl7kgzxsjtwvzmbdfrfq.jpg	2025-06-17 17:41:47.277	2025-06-17 17:41:47.277	8cdfe41e-7046-4bbd-b846-6f2f21644aed
cc5424b7-6aad-40a4-be19-84d28f26efd8	xburguer do dev	22	um xburguer com sabor bem desenvolvido	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750183184/lgg1bnvbkzpdfmwawrj3.jpg	2025-06-17 17:59:46.606	2025-06-17 17:59:46.606	d71a3e6b-ec96-4f23-85d4-1f81a8955fb4
baf80543-15a5-43ec-9702-608d5ceee0d2	pizza teste	65	mt mais gostosa	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750084012/orwl7z7yufclrarvyxmt.jpg	2025-06-16 14:27:52.916	2025-06-16 14:27:52.916	f829d2c5-44c7-4872-b9d7-7f01de54aeeb
6c389bc6-73b3-4a82-96c3-5c9d8a566974	Berute	35	Berute muito saboroso	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750707992/s48kb4x8tg6ekonqmojw.webp	2025-06-23 19:46:39.9	2025-06-23 19:46:39.9	3a17569b-64f4-4eb6-9c2f-99f25181dccd
837fb824-999e-4b32-9836-a7e95c6d1277	vinho do porto	100	vinho do porto	http://res.cloudinary.com/dk2i7ynwd/image/upload/v1750708295/w7ipbt9ldqr0g6qcbrrb.jpg	2025-06-23 19:51:42.397	2025-06-23 19:51:42.397	885b2c36-53e0-4f18-9cab-0ae9861fadbe
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at, update_at) FROM stdin;
a0c64bf6-ed41-4cd7-973d-cb9d7701d3cf	Sujeito Programador	teste@teste.com	$2b$08$XXcMitYymNP.hATVzQptfe85Fsvv7KLSSXTWLOGnns6BvAs9SG6Im	2025-05-19 11:28:13.823	2025-05-19 11:28:13.823
e660c4a0-e27d-4a57-8273-eb429fc82b95	Igor Nunes	igor@teste.com	$2b$08$A9huNdnjR2J6/ZmYUFP8x.b1uFcugr2AFew2JoQdAXPPkCFhAiG8i	2025-05-19 13:26:08.083	2025-05-19 13:26:08.083
9527e295-30f7-4820-901d-156321e84e2b	Almir Ante	almir@teste.com	$2b$08$u0ovk4h/X2U/Om1slGjSaOebj0lAaPuu4vqUx2O0hG.33d14EDzQ.	2025-05-19 14:14:24.24	2025-05-19 14:14:24.24
34280a76-a1b0-4009-b657-c407f1e3bcf2	Joel Villa	joel@teste.com	$2b$08$xkElRZqx3Dg53zAl0r51r.lBfxEcacSjHYiKiEj4UEAHpVqVryTAK	2025-05-20 17:55:27.228	2025-05-20 17:55:27.228
089fa12c-04ca-476d-9220-238c3e893290	Regina Dias	regina@teste.com	$2b$08$YmHB1JRAdrdAV8Ur33BwJ.SzhiAihCNEHGjiqBD/YiIItFA5L0eTW	2025-05-20 18:02:37.636	2025-05-20 18:02:37.636
ca8e2835-ddd1-482a-991a-a6b23fd2ff38	Silvio	silvio@teste.com	$2b$08$6WiGpnw0Po9DPoZCvhnTceDJjXh.kuA.iK6eutwgO7yby4Qu/OwBi	2025-06-23 19:45:01.52	2025-06-23 19:45:01.52
79ff79ee-110b-47c6-8f08-87ca78cb8e85	silvia	silvia@teste.com	$2b$08$jpB87LlX70HM74GLJ2Rvl.QwqyNqS4qDjKg0KkRlKQql6WyqWsuUy	2025-06-23 19:50:46.725	2025-06-23 19:50:46.725
8fb491a8-945c-4d3e-907c-28adf5dda34a	Testar	test@test.com	$2b$08$BqrHh.pUckSabjGu.xn5.u.bV0zD58om0/EbO4UmPSpyNerTK/l2i	2025-08-11 12:03:21.36	2025-08-11 12:03:21.36
e7ab1123-a809-4da5-90ca-7d8b03253bba	O goat	testando@bancodedados.com	$2b$08$0GLYr9/irLjQvii.m/Gc3.E3SzRIw6FiukC.kZZf7oR.bAxOrVb3K	2025-09-02 12:42:10.128	2025-09-02 12:42:10.128
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: items items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

