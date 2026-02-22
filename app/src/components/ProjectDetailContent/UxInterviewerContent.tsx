import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
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

export function UxInterviewerContent({ data }: UxInterviewerContentProps) {
  const { techStack, architecture } = data;
  if (!techStack?.length && !architecture) return null;

  return (
    <>
      {techStack && techStack.length > 0 && (
        <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
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
      )}
      <section className="space-y-8 border-t border-border pt-6 first:border-t-0 first:pt-0">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-6">
          AUTHENTICATION AND ACCESS MANAGEMENT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="flex flex-col gap-0">
          <p className="text-xs text-muted-foreground tracking-wider mb-2">
            UX-Interviewer Login Page
          </p>
          <img
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
      <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
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
    </>
  );
}
