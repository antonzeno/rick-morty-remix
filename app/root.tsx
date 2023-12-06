import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { GlobalErrorBoundary } from "~/components/GlobalErrorBoundary";
import { Layout } from "~/components/Layout";
import { cssBundleHref } from "@remix-run/css-bundle";
import globalStylesHref from "~/assets/global.css";
import { ChildrenProps } from "~/types/types";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client/index.js";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: globalStylesHref },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" },
];

export const meta: MetaFunction = () => {
    return [
        { title: "Rick and Morty | Humly" },
        {
            property: "og:title",
            content: "Rick and Morty",
        },
        {
            name: "description",
            content: "Remix app using GraphQL",
        },
    ];
};

const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
        uri: "https://rickandmortyapi.com/graphql",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }),
    cache: new InMemoryCache(), // Cache management
});

export default function App() {
    return (
        <ApolloProvider client={graphQLClient}>
            <Document>
                <Layout>
                    <Outlet />
                </Layout>
            </Document>
        </ApolloProvider>
    );
}

export function ErrorBoundary() {
    return (
        <Document>
            <Layout>
                <GlobalErrorBoundary />;
            </Layout>
        </Document>
    );
}

function Document({ children }: ChildrenProps) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
