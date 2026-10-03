import { ARCHITECTURE_NODES } from '../../data/portfolioData';
import { Modal } from '../ui/Modal';
import { Tag } from '../ui/Tag';
import { Icon, type IconName } from '../ui/Icon';

interface InspectorProps {
  nodeId: string | null;
  onClose: () => void;
}

const TYPE_ICON: Record<string, IconName> = {
  client: 'monitor',
  service: 'server',
  ai: 'cpu',
  storage: 'database',
  external: 'cloud',
};

const TYPE_LABEL: Record<string, string> = {
  client: 'Client layer',
  service: 'Service layer',
  ai: 'Intelligence layer',
  storage: 'State layer',
  external: 'Third-party',
};

export function ArchitectureInspectorModal({ nodeId, onClose }: InspectorProps) {
  const node = nodeId ? ARCHITECTURE_NODES[nodeId] : null;

  return (
    <Modal
      isOpen={Boolean(node)}
      onClose={onClose}
      label={node ? `${node.label} — architecture component` : 'Architecture component'}
      eyebrow={node ? TYPE_LABEL[node.type] : undefined}
      title={node ? `${node.label} ` : undefined}
    >
      {node && (
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center border border-line-2 text-accent">
              <Icon name={TYPE_ICON[node.type]} size={20} />
            </span>
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-3 uppercase">
              {node.sublabel}
            </p>
          </div>

          <p className="text-[0.9375rem] leading-relaxed text-fg-2">{node.description}</p>

          <div>
            <h5 className="label">Implemented with</h5>
            <ul className="mt-5 flex flex-wrap gap-2">
              {node.tech.map((tech) => (
                <li key={tech}>
                  <Tag accent>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
}
