// Send a project to Supabase to be added to the database

import type { NextApiRequest, NextApiResponse } from 'next';
import { User, createClient } from '@supabase/supabase-js';

import Cors from 'cors';
import initMiddleware from 'utils/initMiddleware';
import rateLimit from 'express-rate-limit';
import slugify from 'slugify';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'HEAD'],
  })
);
const limiter = initMiddleware(
  rateLimit({
    windowMs: 30_000, // 30sec
    max: 150, // Max 150 request per 30 sec
  })
);

interface Project {
  name: string;
  description: string;
  list: string;
}

interface Request extends NextApiRequest {
  body: {
    project: Project;
    user: User;
  };
}

const sendProject = async (
  request: Request,
  response: NextApiResponse
): Promise<void> => {
  await cors(request, response);
  await limiter(request, response);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || ''
  );

  if (request.method === 'POST') {
    const { name, description, list } = request.body.project;

    if (name && description && list) {
      console.log(name, description, list);
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            name: name,
            description: description,
            backlog: list,
            creator: request.body.user.id,
            created_at: new Date(),
            slug: slugify(name, { lower: true }),
          },
        ]);

      // const { data: userData, error: userError } = await supabase
      //   .from('profiles')
      //   .where({ id: request.body.user.id })
      //   .update({
      //     projects: [...request.body.user.projects, projectData[0].id],
      //   });

      console.log(projectData);

      if (projectData && !projectError) {
        response.status(200).json('Your project has been added 🥳');
      } else if (projectError) {
        response.status(500).json(projectError.message);
      }
    }
  }
};

export default sendProject;
