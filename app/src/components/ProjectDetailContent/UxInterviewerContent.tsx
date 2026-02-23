import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ClickableImage } from '@/components/ClickableImage';
import type { ProjectDetailData } from '@/data/projectDetails';

interface UxInterviewerContentProps {
  data: ProjectDetailData;
}

const attemptFlowDiagram = {
  nodes: [
    { id: 'signin', label: 'User signs in', items: ['Cognito'] },
    { id: 'backend-creds', label: 'Backend', items: ['Retrieves temporary credentials'] },
    { id: 'user-attempt', label: 'User', items: ['Completes attempt'] },
    {
      id: 'backend-save',
      label: 'Backend',
      items: ['Saves to UX-Attempts', 'PK: user_id', 'SK: submission_id'],
    },
  ],
  edges: [
    { from: 'signin', to: 'backend-creds' },
    { from: 'backend-creds', to: 'user-attempt' },
    { from: 'user-attempt', to: 'backend-save' },
  ],
};

const speechFeedbackFlowDiagram = {
  nodes: [
    { id: 'user-speech', label: 'User', items: ['Speech or text response'] },
    { id: 'stt', label: 'Web Speech API', items: ['Speech-to-text'] },
    { id: 'llm', label: 'LLM', items: ['Diagram + response + prompt', 'Generates feedback'] },
    { id: 'tts', label: 'ElevenLabs', items: ['Text-to-speech'] },
    { id: 'feedback', label: 'User', items: ['Hears interview feedback'] },
  ],
  edges: [
    { from: 'user-speech', to: 'stt' },
    { from: 'stt', to: 'llm' },
    { from: 'llm', to: 'tts' },
    { from: 'tts', to: 'feedback' },
  ],
};

const paymentScreenshots = [
  { src: '/images/screenshots/ux-interviewer-plans.png', alt: 'Plans and pricing' },
  { src: '/images/screenshots/ux-interviewer-stripe.png', alt: 'Stripe payment' },
];

function PaymentScreenshotsCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on('select', () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} opts={{ align: 'start', loop: true }}>
        <CarouselContent>
          {paymentScreenshots.map((img, i) => (
            <CarouselItem key={i}>
              <ClickableImage
                src={img.src}
                alt={img.alt}
                className="w-full h-auto rounded-lg border border-border"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-3">
          {paymentScreenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                selectedIndex === i
                  ? 'bg-foreground'
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export function UxInterviewerContent({ data }: UxInterviewerContentProps) {
  const { techStack, architecture } = data;
  if (!techStack?.length && !architecture) return null;

  return (
    <>
      {techStack && techStack.length > 0 && (
      <>
        <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
          <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
            PREFACE & TABLE OF CONTENTS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
            <p className="text-sm text-muted-foreground">
              The following sections are a deep dive into the architecture and design of UX-Interviewer. 
              <br />
              <br />
              It is quite lengthy,
              so if you are interested in only certain aspects of the project, you can refer to the table of contents to skip around.
              <br />
              <br />
              Also if you are interested in seeing the final product, you can also visit the live site <a href="https://ux-interviewer.vercel.app" className="text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
            <nav
              aria-label="Table of contents"
              className="rounded-lg border border-border bg-muted/30 p-4 text-sm lg:sticky lg:top-4"
            >
            <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-3">
              On this page
            </p>
            <ul className="list-none p-0 m-0 space-y-0">
              <li>
                <a href="#tech-stack-index" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Tech Stack Index
                </a>
              </li>
              <li>
                <a href="#authentication-and-access-management" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Authentication and Access Management
                </a>
              </li>
              <li>
                <a href="#dynamodb-table-structure" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  DynamoDB Table Structure
                </a>
              </li>
              <li>
                <a href="#prompt-generation" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Prompt Generation
                </a>
              </li>
              <li>
                <a href="#diagramming-interface" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Diagramming Interface
                </a>
              </li>
              <li>
                <a href="#scores-and-feedback" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Scores and Feedback
                </a>
              </li>
              <li>
                <a href="#past-attempts-and-progress-tracking" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Past Attempts and Progress Tracking
                </a>
              </li>
              <li>
                <a href="#payment-and-subscription" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Payment and Subscription
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </section>
        <section id="tech-stack-index" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
          <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
            TECH STACK INDEX
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="bento-card bg-card border border-border w-full">
              <Table className="[&_th]:border-r [&_th]:border-border [&_th:last-child]:border-r-0 [&_td]:border-r [&_td]:border-border [&_td:last-child]:border-r-0">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">Layer</TableHead>
                    <TableHead className="text-muted-foreground">Technology</TableHead>
                    <TableHead className="text-muted-foreground">Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techStack.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-foreground">{row.layer}</TableCell>
                      <TableCell className="text-foreground">{row.technology}</TableCell>
                      <TableCell className="text-foreground whitespace-normal">
                        {row.purpose}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                For our frontend, we used React with TypeScript and Tailwind CSS for styling. This
                allowed for a fast and responsive user experience. For our backend, we used Next.js
                with TypeScript and DynamoDB for data storage.
              </p>
              <p>
                We already use Cognito for authentication so user-based access management on DynamoDB
                was straightforward and easy to implement. As for hosting, we use Vercel for
                deployment, allowing us to easily scale the application as needed and have quick
                deploys on commits.
              </p>
              <p>
                In addition to the technologies mentioned above, we also used ElevenLabs for
                text-to-speech and OpenAI for AI-powered scoring and feedback. In the following
                sections, I will go into more detail about the architecture of the project and the
                system design.
              </p>
            </div>
          </div>
        </section>
        <section id="authentication-and-access-management" className="space-y-8 border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-6">
          AUTHENTICATION AND ACCESS MANAGEMENT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-start">
          <div className="flex flex-col gap-0">
          <ClickableImage
            src="/images/screenshots/ux-interviewer-login.png"
            alt="Login Page Screenshot"
            className="w-full h-auto rounded-lg border border-border"
          />
          </div>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              For authentication, we use Cognito. Our login page uses the AWS SDK for a tailored 
              version of the Cognito login page. This allows us to use the Cognito login page's styling and functionality, 
              but with our own branding. We also connect to Google as an external identity provider as a quicker sign up option.
              <br />
              <br />
              We utitilize Cognito's custom attributes feature to store user information such as daily attempt count, plan type, and more.
              <br />
              <br />
              Since we use Cognito for authentication, user-based access management on DynamoDB was
              straightforward and easy to implement. We use the IAM policy below to manage access
              to the DynamoDB table.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-xs font-medium text-foreground tracking-wider mb-4">
            IAM POLICY & BACKEND FLOW
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="text-sm text-muted-foreground space-y-4">
              <p>
                This policy allows the attached user to put items into the UX-Attempts table, get
                items from the UX-Attempts table, and query the UX-Attempts table. 
              </p>
              <p>  
                A policy like this, assigned to a user in Cognito, lets them access the UX-Attempts table and
                perform only the actions specified in the policy.
              </p>
              <p>
                When a user signs in with Cognito, the backend uses their ID token to obtain
                temporary AWS credentials from the Identity Pool; those credentials are scoped to
                that role, so they can only put/get/query the UX-Attempts table (via the policy
                above).
              </p>
              <p>
                To prevent users from modifying other users’ attempt data, we keep table permissions
                on the backend. When a user submits an interview attempt, our backend performs the
                DynamoDB operations on their behalf. Clients never call DynamoDB directly—they call a
                Next.js API route that handles the request and performs the necessary operations.
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground tracking-wider mb-2">UX-Attempts table policy</p>
              <pre className="m-0 bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground">
                <code className="block whitespace-pre">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-2:037617590942:table/UX-Attempts"
    }
  ]
}`}</code>
              </pre>
            </div>
          </div>
          <br />
          <p className="text-sm text-muted-foreground mb-4">
          The interview attempt flow is as follows:
          
        </p>
        <ArchitectureDiagram
          nodes={attemptFlowDiagram.nodes}
          edges={attemptFlowDiagram.edges}
        />
        </div>
      </section>
      <section id="dynamodb-table-structure" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          DYNAMODB TABLE STRUCTURE
        </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start mb-6">
          <div className="flex flex-col gap-0">
          <p className="text-xs text-muted-foreground tracking-wider mb-2">
              UX-Attempts Table Structure Example
            </p>
            <pre className="m-0 bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground min-w-0">
              <code className="block whitespace-pre">{`{
    "PK": "USER#ID",
    "SK": "SUBMISSION#ID",
    "submissionId": "ID",
    "userId": "ID",
    "design": "a user profile page",
    "target": "a small online store",
    "tohelp": "individual users",
    "model": "gpt-4o-mini",
    "completionTimeMinutes": 10.0,
    "completionTimeSeconds": 3.0,
    "timeLimitMinutes": 15.0,
    "timestamp": "2026-02-07T03:39:58.110Z",
    "breakdown": "[{\"M\":{\"name\":{\"S\":\"Information Architecture\"}...}}]",
    "evaluation": "{\"diagram_overall_score\":{\"N\":\"0\"},\"summary\":{...}}",
    "scores": "{\"linguistics\":{\"N\":\"0\"},\"diagramming\":{\"N\":\"0\"}}",
    "excalidrawData": "{\"elements\":[{\"id\":\"nJSzzdQWeDo8lhjh0UHB...\"}]}"
  }`}</code>
            </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              Our DynamoDB table is structured with a primary key of user_id and a sort key of submission_id. This allows us to store multiple attempts for each user and query them by user_id.
              <br />
              <br />
              Having submission_id as the sort key also allows us to query by submission_id to get a specific attempt and sort by submission_id to get the latest attempt.
              <br />
              <br />
              Excalidraw data is stored as a JSON string and is used to display the diagram in the frontend when users load their past attempts.
              <br />
              <br />
              In the table, we also store other information regarding the case study question, time limit/completion, and grading.
              We can then use this data to show users their past attempts, scores, and overall interviewing progression over certain time periods.
            </p>
          </div>
      </section>
      <section id="prompt-generation" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          PROMPT GENERATION
        </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6 items-start">
            <ClickableImage
              src="/images/screenshots/ux-interviewer-prompt.png"
              alt="Prompt Generation Page Screenshot"
              className="w-full h-auto rounded-lg border border-border"
            />
            <p className="text-sm text-muted-foreground">
              The prompt generation interface is used to generate the prompt for the case study question. Prompt generation is random and
              includes three main components: design, target, and to help. 
              <br />
              <br />
              This prompting style allows us to generate a wide variety of case study questions that are relevant to different design and target audience.
              <br />
              <br />
              If a user sees a sepific page type, audience type, or business type that they like, they can lock it so that the prompt generation only generates questions for that specific type.
              <br />
              <br />
              Users also get the option to customize time constraints and difficulty level.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
          <br />
          When a user starts an interview attempt, an API call is made to a Next.js route to update the user's daily attempt count attribute in Cognito.
          The cookie contains the user's Cognito ID token, which is used to authenticate the user and update the attribute. This allows us to keep track of the user's daily attempt count 
          and prevent free teir users from attempting more than 3 times a day.
          </p>
      </section>
      <section id="diagramming-interface" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          DIAGRAMMING INTERFACE
        </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
          <p className="text-sm text-muted-foreground">
              The diagramming interface is used to draw the diagram for the case study question.
              <br />
              <br />
              On the bottom left, users can see the interviewer's dialogue and have the option to respond with text or speech.
              We use Web Speech API to convert the user's speech into text for LLM feedback input and ElevenLabs to convert the LLM output text to speech.
              <br />
              <br />
              Each prompt includes the user's design, target, and to help, as well as their current excalidraw diagram in JSON format so that the LLM can 
              reference the diagram when generating feedback. 
              <br />
              <br />
              We also use a system prompt to guide the LLM's response and ensure that the response is relevant to the case study question.
            </p>
            <ClickableImage
              src="/images/screenshots/ux-interviewer-diagramming.png"
              alt="Diagramming Page Screenshot"
              className="w-full h-auto rounded-lg border border-border"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4 mb-2">
            User speech and interview feedback flow:
          </p>
          <ArchitectureDiagram
            nodes={speechFeedbackFlowDiagram.nodes}
            edges={speechFeedbackFlowDiagram.edges}
          />
        </section>
        <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
          <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
            SCORES AND FEEDBACK
          </h2>
          <div className="">
            <p className="text-sm text-muted-foreground">
              Upon submission, an API call is made backend to get the user's attempt data and generate scores and feedback.
              Users are graded based on their diagram and transcript. 
              <br />
              <br />
              Currently, we include a system prompt, the user's excalidraw JSON, and the user's transcript in the LLM grading prompt.
              The system prompt includes a grading rubric that the LLM uses to grade the user's attempt to provide an accurate and consistent score.
              <br />
              <br />
              We are currently in the process of testing various models and will be updating the backend to use the best model for the task. 
              We are also experimenting with possibly using a decision tree instead of a rubric for grading in hopes of providing even more accurate and consistent scores.

              During this process, we also store the LLM's response and the user's feedback in the UX-Attempts table. 
              <br />
              <br />
              See the UX-Attempts table structure example above for more details.
            </p>
          </div>
      </section>
      <section id="past-attempts-and-progress-tracking" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          PAST ATTEMPTS AND PROGRESS TRACKING
        </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6 items-start">
            <ClickableImage
              src="/images/screenshots/ux-interviewer-history.png"
              alt="Past Attempts Page Screenshot"
              className="w-full h-auto rounded-lg border border-border"
            />
            <p className="text-sm text-muted-foreground">
              The past attempts page is used to view the user's past attempts and scores. When a user opens this page, 
              an API call is made to the backend to get the user's attempt data and display it on the page. 
              <br />
              <br />
              Results are paginated
              and sorted by timestamp in descending order. Pagination allows for faster loading times and a better user experience.
              <br />
              <br />
              From here, users can click on a specific attempt to view the details of that attempt. When clicking on an attempt, the user is redirected to 
              /submission/[submissionId] where they can see the details of that attempt. 
              <br />
              <br />
              On the new page, a Next.js API route is called to retrieve 
              the attempt data from the UX-Attempts table. Finally, the attempt data is displayed on the page using a Results component.
            </p>
          </div>
      </section>
      <section id="payment-and-subscription" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          PAYMENT AND SUBSCRIPTION
        </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
            <p className="text-sm text-muted-foreground">
              The payment and subscription page is used to manage the user's subscription and payment information. 
              <br />
              <br />
              Payments are handled through stripe with 
              our backend acting as a middleware to handle the payment process. Users can choose from three different plans: Free, Basic, and Pro. 
              <br />
              <br />
              When a plan is selected, users are redirected to the stripe checkout page to complete the payment. This link is generated using the Stripe SDK, passing in the user's cognito ID and price ID.  
              <br />
              <br />
              Upon successful checkout, a webhook is sent from Stripe to our 
              backend server to update the user's subscription status in Cognito. This webhook includes the user's Cognito ID token, the subscription plan, and the payment amount.
            </p>
            <PaymentScreenshotsCarousel />
          </div>
        </section>
      </>
      )}
      
    </>
  );
}
