"use client";

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
  } from "@/components/ui/card";

/*

    Wraps the entire Login Component

    Header
    BackButton,BackButtionLink 
    Socails
    children [Actual Form]


*/

import { Header } from  "@/components/auth/header"
import { Social } from "@/components/auth/oAuth";
import { BackButton } from "@/components/auth/backButton";

interface CardWrapperProps{
    children:React.ReactNode;
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
  }: CardWrapperProps) => {
    return (
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}   {/* Actual Form */}
        </CardContent>
        {showSocial && (
          <CardFooter>
           <Social/>
          </CardFooter>
        )}
        <CardFooter>
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      </Card>
    );
}
