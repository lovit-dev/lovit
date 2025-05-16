import Heading from '../../components/Heading';

function Features() {
  return (
    <section className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4'>
      <Feature
        title='Easy to Use'
        description='Set it up quickly, apply error handlers, and let the library do the rest.'
        icon='✅'
      />
      <Feature
        title='Centralized Control'
        description='Handle related functions in a centralized place for cleaner code.'
        icon='📦'
      />
      <Feature
        title='Handlers for HTTP Codes'
        description='Predefined handlers for all HTTP error status codes, simplifying error handling.'
        icon='🗃️'
      />
      <Feature
        title='Works Everywhere'
        description='Compatible with both client-side and Node.js environments.'
        icon='⚡'
      />
      <Feature
        title='Tree Shakable'
        description='The library is designed so that only the code you use is included in the final bundle.'
        icon='🧹'
      />
      <Feature
        title='Custom Error Object'
        description='Create error objects with custom properties, giving you more control over error handling.'
        icon='📝'
      />
      <Feature
        title='Seamless Integration'
        description='Easily integrates with your code, with no major changes required.'
        icon='🔗'
      />
      <Feature title='Free' description='Fully open-source, available for anyone to use and contribute.' icon='🌐' />
    </section>
  );
}

function Feature({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <article className='rounded-xl bg-black-light p-6'>
      <span className='mb-5 flex size-9 items-center justify-center rounded-sm bg-black-light-2'>{icon}</span>
      <Heading className='text-grey-light' as='h3'>
        {title}
      </Heading>
      <p className='pt-2 text-sm text-grey'>{description}</p>
    </article>
  );
}

export default Features;
